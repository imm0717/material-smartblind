import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from "./../material/material.module";
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
