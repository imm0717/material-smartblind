import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.scss']
})
export class AppBodyComponent implements OnInit {

  events: string[] = [];
  opened: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

}
