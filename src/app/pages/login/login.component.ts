import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  isRegister = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    const payload = { email: this.email, password: this.password };
    if (this.isRegister) {
      this.auth.register(payload).subscribe(() => {
        this.isRegister = false;
        alert('Registration successful! You can now login.');
      });
    } else {
      this.auth.login(payload).subscribe((res: any) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard/add-customer']);
      });
    }
  }

  toggle() {
    this.isRegister = !this.isRegister;
  }
}
