import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  roles = [];
  ImgUrl: string;
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
    this.createForm();
    this.getRoles();
  }

  createForm() {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeeMobile: ['', Validators.required],
      employeeRoles: ['', Validators.required],
      jobType: ['', Validators.required],
      employeeDOB: ['', Validators.required]
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
    this.formData.append('profile', this.selectedFile);
    this.formData.append('employeeName', this.employeeForm.value.employeeName);
    this.formData.append('employeeEmail', this.employeeForm.value.employeeEmail);
    this.formData.append('employeeMobile', this.employeeForm.value.employeeMobile);
    this.formData.append('employeeRoles', this.employeeForm.value.employeeRoles);
    this.formData.append('jobType', this.employeeForm.value.jobType);
    this.formData.append('employeeDOB', this.employeeForm.value.employeeDOB);

    this.http.postServiceCall('createemployee', this.formData, true).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.sharedService.showMessage(res['message']);
        this.router.navigate(['../list-employee'], { relativeTo: this.route })
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      console.log(err);
      this.sharedService.showMessage(err.error['message']);
    });
  }
}
