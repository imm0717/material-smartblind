import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Address } from 'src/app/core/models';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

@Component({
  selector: 'user-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() userId: number
  @Input() address: Address[]
  @Output() deleteAddress: EventEmitter<Address> = new EventEmitter()

  /* address: String[] = ['Calle canal #3310 e/ 12 y 14, Rpto Antonio Maceo, Cerro',
    'Calle I e/ 23 y 25 #32310, Vedado, Plaza'] */

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('Address Component')
  }

  onDelete(address: Address){
    this.deleteAddress.emit(address);
  }

  openAddressDialog(){
    let dialogConfig: MatDialogConfig = {
      width: '500px',
      height: '500px',
      data: {
        userId: this.userId
      }
    }

    this.dialog.open(AddressDialogComponent, dialogConfig)
  }

}
