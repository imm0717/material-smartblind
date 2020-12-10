import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  address: String[] = ['Calle canal #3310 e/ 12 y 14, Rpto Antonio Maceo, Cerro',
    'Calle I e/ 23 y 25 #32310, Vedado, Plaza']

  constructor() { }

  ngOnInit(): void {

    console.log('Address Component')

  }

}
