import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
