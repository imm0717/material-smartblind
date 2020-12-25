import { ProfileDto, ProfileFormData } from './../dto/profile.dto';
import { ErrorApiResponse, SuccessApiResponse } from './../../http/api-reponse.model';
import { User } from './../../core/models/user.model';
import { UsersService } from './../users.service';
import FormComponent from 'src/app/core/components/form.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Address, Gender } from 'src/app/core/models';
import { error } from 'protractor';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  exportAs: 'user-profile'
})
export class ProfileComponent extends FormComponent implements OnInit {

  @Input('userId') public userId: number
  maxDateOfBirth: Date
  genders: Gender[] = []
  profileData: ProfileFormData

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    super('ProfileComponent');
    this.initForm()
  }
  
  ngOnInit(): void {
    this.loadUserData(this.userId)
  }

  initForm(): void {

    this.formGroup = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
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

  

  onSubmit() {
    return this.saveProfileData()
  }

  loadUserData(id: number){
    this.usersService.loadUser(id).subscribe(
      (response: SuccessApiResponse<User>) => {
        this.profileData = new ProfileDto().fromRawToFormData(response)
        this.formGroup.patchValue(this.profileData)
      },
      (error: ErrorApiResponse<User>) => alert(error.message)
    )
  }

  saveProfileData(){
    let formData = new ProfileDto().fromFormToRawData(this.formGroup.value)
    return this.usersService.updateUserProfile(this.userId, formData)
  }

  deleteProfileAddress(address: Address){
    this.usersService.removeUserAddress(this.profileData.id, address.id).subscribe(
      () => {
        let addressIndex = this.profileData.address.indexOf(address);
        this.profileData.address.splice(addressIndex, 1)
      },
      (error) => alert("Error al eliminar Address")
    )
  }
  
}
