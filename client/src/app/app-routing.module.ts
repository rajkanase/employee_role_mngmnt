import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RolesComponent } from './components/roles/roles.component';
import { ListRoleComponent } from './components/roles/list-role/list-role.component';
import { AddRoleComponent } from './components/roles/add-role/add-role.component';
import { UpdateRoleComponent } from './components/roles/update-role/update-role.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ListEmployeeComponent } from './components/employees/list-employee/list-employee.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/employees/update-employee/update-employee.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'registration', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]
  },
  {
    path: 'registration', component: RegistrationComponent, canActivate: [NotAuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'list-role', pathMatch: 'full' },
          { path: 'list-role', component: ListRoleComponent, canActivate: [AuthGuard] },
          { path: 'add-role', component: AddRoleComponent, canActivate: [AuthGuard] },
          { path: 'update-role/:id', component: UpdateRoleComponent, canActivate: [AuthGuard] },
        ]
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'list-employee', pathMatch: 'full' },
          { path: 'list-employee', component: ListEmployeeComponent, canActivate: [AuthGuard] },
          { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
          { path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate: [AuthGuard] },
        ]
      },
    ],
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
