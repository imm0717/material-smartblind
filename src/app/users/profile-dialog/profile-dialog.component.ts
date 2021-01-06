import { ProfileComponent } from './../profile/profile.component';
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit, AfterViewInit {

  loadContent: boolean = false

  @ViewChild(ProfileComponent) private profileComponent: ProfileComponent

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ProfileDialogComponent>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  submitProfile(){
    this.profileComponent.onSubmit().subscribe(
      () => this.close(),
      (error) => alert('Error Saving data')
    )
  }

  close(){
    this.dialogRef.close()
  }

  

}
