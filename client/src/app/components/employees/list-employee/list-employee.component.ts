import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employees = [];
  constructor(
    private http: HttpService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  openDialog(ind): void {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      width: '250px',
      data: { data: this.employees[ind] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getEmployees() {
    this.http.getServiceCall('getemployees').subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.employees = res['data'];
      } else {
        this.sharedService.showMessage(res['message']);
      }
    }, err => {
      console.log(err);
      this.sharedService.showMessage(err.error['message']);
    });
  }

  onAddEmployee() {
    this.router.navigate(['../add-employee'], { relativeTo: this.route });
  }

  onUpdateIcon(id) {
    this.router.navigate(['../update-employee', id], { relativeTo: this.route });
  }

}
