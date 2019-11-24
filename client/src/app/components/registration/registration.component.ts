import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide: boolean = true;
  hideC: boolean = true;
  regForm: FormGroup;
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
    this.regForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    });
  }

  onRegFormSubmit() {
    console.log(this.regForm.value);
    this.http.postServiceCall('createuser', this.regForm.value, false).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.sharedService.showMessage(res['message']);
        this.router.navigate(['login']);
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      this.sharedService.showMessage(err.error['message']);
    });
  }

}
