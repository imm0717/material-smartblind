import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatDividerModule,
  MatListModule
]

@NgModule({
  declarations: [],
  imports: [
    materialModules
  ],
  exports: [
    materialModules
  ]
})
export class MaterialModule { }
