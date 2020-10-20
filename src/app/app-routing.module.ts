import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: AppBodyComponent, canActivate:[AuthGuard], children: [
    { path: '', component: DashboardComponent }
  ] },
  { path: 'login', component: LoginComponent, canActivate:[NoAuthGuard] },
  { path: 'signup', component: RegisterComponent, canActivate:[NoAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
