import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-notify-customer',
  templateUrl: './notify-customer.component.html'
})
export class NotifyCustomerComponent implements OnInit {
  districts: string[] = [];
  selectedDistrict: string | null = null;
  message = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    // ✅ Get list of districts on load
    this.customerService.getUsedAreas().subscribe((areas: any) => {
      areas.forEach((area: any) => {
        this.districts.push(area.district);
      })
    });
  }

  send() {
  if (!this.message.trim()) {
    alert('Message is required');
    return;
  }

  const payload = {
    district: this.selectedDistrict ?? 'all',  // 🟡 default to 'all' if null
    message: this.message
  };

  this.customerService.sendMessages(payload).subscribe(() => {
    alert('Messages sent successfully!');
    this.message = '';
    this.selectedDistrict = null;
  });
  }

}
