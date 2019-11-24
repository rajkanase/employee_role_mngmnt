import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuList = [
    {
      name: 'Roles',
      route: 'roles'
    }, {
      name: 'Employees',
      route: 'employees'
    }
  ];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
