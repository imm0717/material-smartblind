import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessApiResponse } from '../http/api-reponse.model';
import { User } from './../core/models/user.model';
import { UsersService } from './users.service';

/**
 * Data source for the Users view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersDataSource extends DataSource<User> {
  data: User[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  usersService: UsersService
  private userServiceSuscription: Subscription

  constructor(private service: UsersService) {
    super();
    this.usersService = service;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    let usersObservable = this.usersService.getUsers().pipe(
      map( data => {
          this.data = data
          return data
      })
    )

    const dataMutations = [
      usersObservable,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    //this.userServiceSuscription.unsubscribe()
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstname': return compare(a.profile.firstname, b.profile.firstname, isAsc);
        case 'lastname': return compare(a.profile.lastname, b.profile.lastname, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
