import { UsersService } from './../users.service';
import { FormBuilder, Validators } from '@angular/forms';
import FormComponent from 'src/app/core/components/form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent extends FormComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<AddressDialogComponent>, private fb: FormBuilder, private userService: UsersService) {
    super('AddressComponent')
    this.initForm()
   }

   initForm(): void {
    this.formGroup = this.fb.group({
      fullname: [null, Validators.required],
      address1: [null, Validators.required],
      address2: [null],
      postalcode: [null],
      city: [null, Validators.required],
      phone: [null]
    })
  }

  saveAddressData(){
    let data = this.formGroup.value
    this.userService.addUserAddress(this.data.userId, data).subscribe(
      () => this.close(),
      (error) => alert(error)

    )
  }

  ngOnInit(): void {
  }

  close(){
    this.matDialogRef.close()
  }

}
