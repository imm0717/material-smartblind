import { AddressComponent } from './../address/address.component';
import { ProfileComponent } from './../profile/profile.component';
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(ProfileComponent) private profileComponent: ProfileComponent
  @ViewChild(AddressComponent) private addressComponent: AddressComponent

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ProfileDialogComponent>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  submitProfile(){
    this.profileComponent.onSubmit()
  }

  close(){
    this.dialogRef.close()
  }

  

}
