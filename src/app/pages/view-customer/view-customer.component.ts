import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss'
})
export class ViewCustomerComponent implements OnInit {
  customers: any[] = [];
  search: string = '';
  page = 1;
  limit = 5;
  total = 0;
  totalPages = 1;

  editingCustomer: any = null;
  viewingCustomer: any = null;

  newProduct = {
    name: '',
    price: '',
    date: ''
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.customerService.getCustomers(this.page, this.limit, this.search).subscribe(
      (res: any) => {
        this.customers = res.data || [];
        this.total = res.total || 0;
        this.totalPages = Math.ceil(this.total / this.limit);
      },
      (err) => console.error('Error fetching customers', err)
    );
  }

  onSearchChange() {
    this.page = 1;
    this.fetchCustomers();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchCustomers();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchCustomers();
    }
  }

  deleteCustomer(id: string) {
    if (confirm('Are you sure to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        alert('Customer deleted');
        this.fetchCustomers();
      });
    }
  }

  editCustomer(customer: any) {
    this.editingCustomer = { ...customer };
  }

  cancelEdit() {
    this.editingCustomer = null;
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.editingCustomer._id, this.editingCustomer).subscribe(() => {
      alert('Customer updated');
      this.editingCustomer = null;
      this.fetchCustomers();
    });
  }

  openViewModal(customer: any) {
    this.viewingCustomer = { ...customer };
    if (!this.viewingCustomer.products) {
      this.viewingCustomer.products = [];
    }
    this.resetNewProduct();
  }

  closeViewModal() {
    this.viewingCustomer = null;
  }

  resetNewProduct() {
    this.newProduct = {
      name: '',
      price: '',
      date: ''
    };
  }

  addProductToCustomer() {
    if (!this.viewingCustomer || !this.viewingCustomer._id) return;

    const updatedCustomer = { ...this.viewingCustomer };
    updatedCustomer.products.push({ ...this.newProduct });

    this.customerService.updateCustomer(updatedCustomer._id, updatedCustomer).subscribe(() => {
      alert('Product added');
      this.viewingCustomer = updatedCustomer;
      this.resetNewProduct();
      this.fetchCustomers(); // Optional
    });
  }
}
