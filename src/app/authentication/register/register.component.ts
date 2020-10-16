import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import FormComponent from 'src/app/core/components/form.component';
import { arePasswordsEquals } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormComponent {
  hide: boolean = true
  confirmHide: boolean = true

  constructor(private fb: FormBuilder) {
    super('RegisterForm')
    this.initForm(fb)
  }

  initForm(fb: FormBuilder) {
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

  onSubmit() {
    console.log(Object.keys(this.formGroup.value))
  }
}
