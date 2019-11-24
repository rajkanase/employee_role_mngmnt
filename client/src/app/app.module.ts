import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UpdateEmployeeComponent } from './components/employees/update-employee/update-employee.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './components/home/home.component';
import { RolesComponent } from './components/roles/roles.component';
import { AddRoleComponent } from './components/roles/add-role/add-role.component';
import { ListRoleComponent } from './components/roles/list-role/list-role.component';
import { UpdateRoleComponent } from './components/roles/update-role/update-role.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { ListEmployeeComponent } from './components/employees/list-employee/list-employee.component';
import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    HomeComponent,
    RolesComponent,
    AddRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
