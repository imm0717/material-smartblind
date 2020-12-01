import { SuccessApiResponse } from './../http/api-reponse.model';
import { Observable } from 'rxjs';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { User } from '../core/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpService) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('users').pipe(
      map( (data: SuccessApiResponse<User[]>) => data.data)
    )
  }
}
