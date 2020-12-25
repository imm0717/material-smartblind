import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/core/models';

@Component({
  selector: 'user-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() address: Address[]
  @Output() deleteAddress: EventEmitter<Address> = new EventEmitter()

  /* address: String[] = ['Calle canal #3310 e/ 12 y 14, Rpto Antonio Maceo, Cerro',
    'Calle I e/ 23 y 25 #32310, Vedado, Plaza'] */

  constructor() { }

  ngOnInit(): void {
    console.log('Address Component')
  }

  onDelete(address: Address){
    this.deleteAddress.emit(address);
  }

}
