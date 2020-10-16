import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: AppBodyComponent, children: [
    { path: '', component: DashboardComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
