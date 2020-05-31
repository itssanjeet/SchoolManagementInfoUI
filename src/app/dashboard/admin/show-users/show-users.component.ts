import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {
  allUsers: User[];
  constructor(private dashboard_service: DashboardService) { }

  ngOnInit() {
    this.dashboard_service.getAllUsers().subscribe(res => {
      this.allUsers = res;
    });
  }

}
