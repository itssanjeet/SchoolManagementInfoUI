import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: true }) singInForm: NgForm;
  credential: { username: string, password: string }
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private login_service: LoginService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.singInForm.invalid) {
      return;
    }

    this.loading = true;

    this.credential = { username: this.singInForm.value.username, password: this.singInForm.value.password };

    this.login_service.authenticate(this.credential).subscribe(res => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      if (error.status == 403) {
        this.error = 'Wrong credentials invalid username or password';
      }
    });
  }

}
