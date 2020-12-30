import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from '../material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { AddressComponent } from './address/address.component';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';


@NgModule({
  declarations: [UsersComponent, ProfileComponent, ProfileDialogComponent, AddressComponent, AddressDialogComponent],
  bootstrap: [ProfileDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
