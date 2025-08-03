import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { mpData } from '../../mp-data';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
   styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent implements OnInit {
  customer: any = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    district: '',
    taluk: '',
    gram: '',
    tractorRc: '',
    products: [] // Array of product objects
  };

  newProduct = { name: '', price: '', date: '' };

  districts: any[] = [];
  taluks: any[] = [];
  villages: string[] = [];

  selectedDistrict = '';
  selectedTaluk = '';

  constructor(private service: CustomerService) {}

  ngOnInit() {
    if (mpData) {
      this.districts = mpData.districts;
    } else {
      console.error('Madhya Pradesh data not found!');
    }
  }

  onDistrictChange() {
    const district = this.districts.find(d => d.district === this.selectedDistrict);
    this.taluks = district ? district.subDistricts : [];
    this.selectedTaluk = '';
    this.villages = [];
    this.customer.gram = '';
    this.customer.district = district?.district || '';
  }

  onTalukChange() {
    const taluk = this.taluks.find(t => t.subDistrict === this.selectedTaluk);
    this.villages = taluk ? taluk.villages : [];
    this.customer.taluk = taluk?.subDistrict || '';
    this.customer.gram = '';
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.date) {
      this.customer.products.push({ ...this.newProduct });
      this.newProduct = { name: '', price: '', date: '' };
    } else {
      alert('Please fill in all product fields.');
    }
  }

  removeProduct(index: number) {
    this.customer.products.splice(index, 1);
  }

  submit() {
    if (!this.customer.name || !this.customer.mobile) {
      alert('Name and Mobile are required.');
      return;
    }

    this.service.addCustomer(this.customer).subscribe(() => {
      alert('Customer added successfully!');
      this.customer = {
        name: '',
        email: '',
        mobile: '',
        address: '',
        district: '',
        taluk: '',
        gram: '',
        tractorRc: '',
        products: []
      };
      this.selectedDistrict = '';
      this.selectedTaluk = '';
      this.taluks = [];
      this.villages = [];
    });
  }
}
