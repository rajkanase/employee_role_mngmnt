import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
  roles = [];
  constructor(
    private http: HttpService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRoles();
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

  onAddRole() {
    this.router.navigate(['../add-role'], { relativeTo: this.route });
  }

  onUpdateIcon(id) {
    this.router.navigate(['../update-role', id], { relativeTo: this.route });
  }

}
