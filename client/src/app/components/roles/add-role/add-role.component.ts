import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  roleForm: FormGroup;
  constructor(
    private http: HttpService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      roleDescription: ['', Validators.required]
    });
  }

  onRoleFormSubmit() {
    console.log(this.roleForm.value);
    this.http.postServiceCall('createrole', this.roleForm.value, true).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.sharedService.showMessage(res['message']);
        this.router.navigate(['../list-role'], { relativeTo: this.route })
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      console.log(err);
      this.sharedService.showMessage(err.error['message']);
    });
  }

}
