import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  onSideNavChange: boolean = true;
  menuList = [
    {
      name: 'Roles'
    }, {
      name: 'Employees'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
