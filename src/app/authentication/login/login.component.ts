import { ApiResponse } from './../../http/api-reponse.model';
import { AuthenticationService } from './../authentication.service';
import FormComponent from 'src/app/core/components/form.component';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormComponent {
  hide = true
  remember = false

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {
    super('LoginForm')
    this.initForm()
  }

  initForm(){
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [false]
    });

  }

  onTogglePasswordHide(e){
    e.preventDefault()
    this.hide = !this.hide
  }

  login(){
    this.authService.login(this.formGroup.get('email').value, this.formGroup.get('password').value).subscribe(
      (data: ApiResponse<Credential>) => {
        this.router.navigate(['/'])
      },
      error => {
        console.log(error)
      }
    )
  }

  onSubmit() {
    this.login()
  }

  redirectToSignUp(){
    this.router.navigate(['/signup'])

  }
}
