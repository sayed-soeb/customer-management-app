import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
