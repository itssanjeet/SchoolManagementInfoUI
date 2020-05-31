import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { LoginService } from '../services/login.service';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(private dashboard_service: DashboardService, private loginService: LoginService) { }

  ngOnInit() {
    this.dashboard_service.getUserDetails().subscribe(res => {
      this.user = res;
    }, error => {
      console.log(error)
    });
  }

  logout() {
    this.loginService.logout();
  }
}
