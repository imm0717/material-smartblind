import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true
  remember = false
  addressForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    remember: [false]
  });

  constructor(private fb: FormBuilder) {}

  onTogglePasswordHide(e){
    e.preventDefault()
    this.hide = !this.hide
  }

  onSubmit() {
    alert('Thanks!');
  }
}
