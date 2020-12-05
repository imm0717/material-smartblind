import { SignupCredential } from './../../core/models';
import { AuthenticationService } from './../authentication.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import FormComponent from 'src/app/core/components/form.component';
import { arePasswordsEquals } from 'src/app/core/validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormComponent {
  hide: boolean = true
  confirmHide: boolean = true

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    super('RegisterForm')
    this.initForm()
  }

  initForm() {
    this.formGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [
        Validators.email,
        Validators.required
      ]],
      passwordGroup: this.fb.group({
        password: [null, [Validators.required, Validators.minLength(8)]],
        passwordConfirm: [null, [Validators.required, Validators.minLength(8)]]
      }, { validators: [arePasswordsEquals] })
    });
  }

  onTogglePasswordHide(e) {
    e.preventDefault()
    this.hide = !this.hide
  }

  onToggleConfirmPasswordHide(e) {
    e.preventDefault()
    this.confirmHide = !this.confirmHide
  }

  prepareData(): SignupCredential {
    let formData = this.formGroup.value
    return {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      password: formData.passwordGroup.password
    }
  }

  onSubmit() {
    let credential: SignupCredential = this.prepareData()
    this.authService.signup(credential).subscribe(
      (data) => this.router.navigate(['']),
      (error) => console.log(error)
    )
  }
}
