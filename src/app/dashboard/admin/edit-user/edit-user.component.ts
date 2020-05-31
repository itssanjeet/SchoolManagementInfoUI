import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  user_role: any = ['teacher', 'student', 'parant', 'user']
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dashboard_service: DashboardService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        let user_id: number = params.user_id;
        this.dashboard_service.getUserById(user_id).subscribe(user => {
          this.user = user;
          this.editForm = this.formBuilder.group({
            firstName: [user.firstName, Validators.required],
            lastName: [user.lastName, Validators.required],
            email: [user.email, Validators.required],
            username: [user.username, Validators.required],
            role: [user.role, [Validators.required, Validators.minLength(6)]]
          });
        });
      });
    this.initialize();
  }
  initialize() {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  editFormClicked() {
    this.user.firstName = this.editForm.value.firstName;
    this.user.lastName = this.editForm.value.lastName;
    this.user.email = this.editForm.value.email;
    this.user.role = this.editForm.value.role;
    this.user.username = this.editForm.value.username;
    this.dashboard_service.saveEditedUser(this.user).subscribe(user => {
      console.log('Saved User:', user);
      this.router.navigate(['/dashboard/admin/show-users']);
    });
  }

  cancel() {
    this._location.back();
  }
}
