import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile, Address, User } from '../core/models';
import { SuccessApiResponse } from './../http/api-reponse.model';
import { HttpService } from './../http/http.service';

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

  updateUserProfile(userId: number, profile: Profile): Observable<SuccessApiResponse<User>>{
    return this.http.put('users/' + userId + '/profile', profile)
  }

  addUserAddress(userId: number, address: Address): Observable<SuccessApiResponse<Address>>{
    return this.http.post('users/' + userId + '/address', address)
  }

  removeUserAddress(userId: number, addressId: number ): Observable<SuccessApiResponse<Boolean>> {
    return this.http.delete('users/' + userId + '/address/' + addressId)
  }
}
