import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:5000/api/customers';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  // ✅ Add new customer
  addCustomer(data: any) {
    return this.http.post(this.baseUrl, data, this.getHeaders());
  }

  // ✅ Get all customers with pagination and search
  getCustomers(page: number = 1, limit: number = 5, search: string = '') {
    return this.http.get(
      `${this.baseUrl}?page=${page}&limit=${limit}&search=${search}`,
      this.getHeaders()
    );
  }

  // ✅ Delete customer
  deleteCustomer(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  // ✅ Update customer
  updateCustomer(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.getHeaders());
  }

  // ✅ Send message
  sendMessages(payload: { district: string | null; message: string }) {
    return this.http.post(`${this.baseUrl}/send-messages`, payload, this.getHeaders());
  }

  // ✅ Get follow-up customers (3 months old)
  getFollowUps() {
    return this.http.get(`${this.baseUrl}/followups`, this.getHeaders());
  }

  // ✅ Mark customer as contacted
  markAsContacted(id: string) {
    return this.http.patch(`${this.baseUrl}/${id}/contacted`, {}, this.getHeaders());
  }

  // ✅ Search in follow-ups
  searchFollowUps(query: string) {
    return this.http.get(`${this.baseUrl}/search?q=${query}`, this.getHeaders());
  }

  // ✅ District list fetch karne ke liye
  getUsedAreas() {
  return this.http.get(`${this.baseUrl}/used-areas`, this.getHeaders());
  }

}
