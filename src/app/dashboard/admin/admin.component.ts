import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../service/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  allUsers: User[];
  editable: boolean;
  edit_user: User;
  constructor(
    private dashboard_service: DashboardService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.editable = false;
  }
}
