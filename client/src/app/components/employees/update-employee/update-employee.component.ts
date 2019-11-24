import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  roles = [];
  ImgUrl: string;
  loadForm: boolean = false;
  selectedFile: File;
  formData = new FormData();
  urls = [];
  radioLabels = [
    { name: 'Full Time' },
    { name: 'Part Time' }
  ];
  constructor(
    private http: HttpService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getRoles();
    this.route.params.subscribe(params => {
      console.log(params);
      this.getEmployee(params.id);
    });
  }

  getEmployee(paramId) {
    this.http.getServiceCall(`getsingleemployee/${paramId}`).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.createForm(res['data']);
        this.ImgUrl = environment.imageUrl + res['data'].employeeProfile;
      } else {
        this.sharedService.showMessage(res['message']);
      }
    })
  }

  createForm(data) {
    this.loadForm = true;
    this.employeeForm = this.fb.group({
      employeeId: [data._id],
      employeeName: [data.employeeName, Validators.required],
      employeeEmail: [data.employeeEmail, Validators.required],
      employeeMobile: [data.employeeMobile, Validators.required],
      employeeRoles: [data.employeeRoles, Validators.required],
      jobType: [data.jobType, Validators.required],
      employeeDOB: [data.employeeDOB, Validators.required]
    });
  }

  getRoles() {
    this.http.getServiceCall('getroles').subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.roles = res['data'];
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      console.log(err);
      this.sharedService.showMessage(err.error['message']);
    });
  }

  choosePhoto() {
    document.getElementById('my_file').click();
  }

  readUrl(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    this.formData.append('profile', this.selectedFile);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.ImgUrl = event.target.result;
        return;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onEmployeeFormSubmit() {
    this.formData.append('_id', this.employeeForm.value.employeeId);
    this.formData.append('employeeName', this.employeeForm.value.employeeName);
    this.formData.append('employeeEmail', this.employeeForm.value.employeeEmail);
    this.formData.append('employeeMobile', this.employeeForm.value.employeeMobile);
    this.formData.append('employeeRoles', this.employeeForm.value.employeeRoles);
    this.formData.append('jobType', this.employeeForm.value.jobType);
    this.formData.append('employeeDOB', this.employeeForm.value.employeeDOB);

    this.http.postServiceCall('updateemployee', this.formData, true).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.sharedService.showMessage(res['message']);
        this.router.navigate(['../../list-employee'], { relativeTo: this.route })
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      console.log(err);
      this.sharedService.showMessage(err.error['message']);
    });
  }

}
