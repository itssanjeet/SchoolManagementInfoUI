import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  ROOT_URL: string = 'http://localhost:9090';
  constructor(private http: HttpClient) { }

  getAllStudent() {
      return this.http.get(`${this.ROOT_URL}/student`);
  }
}