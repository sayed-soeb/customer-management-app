import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss']
})
export class FollowupComponent implements OnInit {
  followUps: any[] = [];
  searchText = '';
  loading = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadFollowUps();
  }

  // 👇 3 months old follow-ups load karo
  loadFollowUps() {
    this.loading = true;
    this.customerService.getFollowUps().subscribe({
      next: (res: any) => {
        this.followUps = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error loading follow-ups');
      }
    });
  }

  // 👇 Search function
  search() {
    if (!this.searchText.trim()) {
      this.loadFollowUps();
      return;
    }

    this.customerService.searchFollowUps(this.searchText).subscribe({
      next: (res: any) => {
        this.followUps = res;
      },
      error: () => {
        alert('Search failed');
      }
    });
  }

  // 👇 Mark customer as contacted
  markContacted(customerId: string) {
    this.customerService.markAsContacted(customerId).subscribe({
      next: () => {
        this.followUps = this.followUps.filter(c => c._id !== customerId);
      },
      error: () => {
        alert('Error updating contacted status');
      }
    });
  }
}
