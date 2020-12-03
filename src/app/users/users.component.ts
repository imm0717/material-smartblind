import { ProfileComponent } from './profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UsersDataSource } from './users-datasource';
import { User } from '../core/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource: UsersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstname', 'lastname', 'email', 'active', 'actions'];
  columnsDataType = {
    'fistname': 'text',
    'lastname': 'text',
    'email': 'email',
    'active': 'text'
  }

  constructor(private usersService: UsersService, public dialog: MatDialog){}

  openDialog(profileData){
    this.dialog.open(ProfileComponent, {
      width: '800px',
      height: '600px',
      data: {
        profile: profileData
      }
    })
  }

  ngOnInit() {
    this.dataSource = new UsersDataSource(this.usersService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
