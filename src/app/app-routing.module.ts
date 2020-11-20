import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppBodyComponent } from './layouts/app-body/app-body.component';


const routes: Routes = [
  
  { path: '', component: AppBodyComponent, canActivate:[AuthGuard], children: [
    { path: '', component: DashboardComponent},
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
  ] },
  { path: 'login', component: LoginComponent, canActivate:[NoAuthGuard] },
  { path: 'signup', component: RegisterComponent, canActivate:[NoAuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
