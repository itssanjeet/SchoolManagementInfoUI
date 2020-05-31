import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ROOT_URL: string = 'http://localhost:9090';
  user_id: number;
  constructor(private http: HttpClient) { }

  getUserById(id: number) {
    return this.http.get<User>(`${this.ROOT_URL}/getUserById?id=` + id);
  }

  getUserDetails() {
    return this.http.get<User>(`${this.ROOT_URL}/hello`);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.ROOT_URL}/get`);
  }

  getUserByRole(roleValue: string) {
    return this.http.get<User[]>(`${this.ROOT_URL}/usersByRole`, {
      params: {
        role: roleValue
      }
    });
  }

  saveEditedUser(user: User) {
    return this.http.post(`${this.ROOT_URL}/updateUser`, user);
  }

}
