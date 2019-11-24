import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLoginFormSubmit() {
    console.log(this.loginForm.value);
    this.http.postServiceCall('loginuser', this.loginForm.value, false).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.sharedService.setLocalStorage('token', res['token']);
        this.router.navigate(['home']);
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      this.sharedService.showMessage(err.error['message']);
    });
  }

}
