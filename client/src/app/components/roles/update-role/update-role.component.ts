import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  roleForm: FormGroup;
  loadForm: boolean = false;
  constructor(
    private http: HttpService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.getRoleData(params.id);
    });
  }

  getRoleData(paramId: string) {
    this.http.getServiceCall(`getsinglerole/${paramId}`).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.createForm(res['data']);
      } else {
        this.sharedService.showMessage(res['message']);
      }
    })
  }

  createForm(data: any) {
    console.log(data);
    this.loadForm = true;
    this.roleForm = this.fb.group({
      _id: [data._id],
      roleName: [data.roleName, Validators.required],
      roleDescription: [data.roleDescription, Validators.required]
    });
  }

  onRoleFormSubmit() {
    console.log(this.roleForm.value);
    this.http.postServiceCall('updaterole', this.roleForm.value, true).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.sharedService.showMessage(res['message']);
        this.router.navigate(['../../list-role'], { relativeTo: this.route })
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      console.log(err);
      this.sharedService.showMessage(err.error['message']);
    });
  }
}
