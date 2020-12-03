import { UsersService } from './../users.service';
import FormComponent from 'src/app/core/components/form.component';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Gender, Profile } from 'src/app/core/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends FormComponent {

  @Input() data
  maxDateOfBirth: Date
  genders: Gender[] = []

  initForm(fb: FormBuilder): void {

    this.formGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      date_of_birth: [null],
      phone: [null, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')],
      gender: [null, Validators.required],
    });

    this.maxDateOfBirth = new Date(new Date().getFullYear() - 18, 12, 31)
    this.genders = [
      {id: 1, gender: 'Female', active: true},
      {id: 2, gender: 'Male', active: true},
    ]
  }

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    super('ProfileComponent');
    this.initForm(fb)

    console.log(this.data)
  }

  onSubmit() {
    alert('Thanks!');
  }

  submitProfileData() {
    //this.usersService.updateUserProfile()
    
  }
}
