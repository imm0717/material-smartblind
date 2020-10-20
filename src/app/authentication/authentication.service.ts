import { SuccessApiResponse } from './../http/api-reponse.model';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStoreService } from './../core/services/local-store.service';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../http/api-reponse.model';
import { SignupCredential, User } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthSubject = new BehaviorSubject<boolean>(false)
  public isAuth = this.isAuthSubject.asObservable()

  constructor(private http: HttpService, private store: LocalStoreService) { }

  private saveCredentials(credential: Credential){
    this.store.set('credential', credential)
    this.isAuthSubject.next(true)
  }

  private removeCredentials(){
    this.store.remove('credential')
    this.isAuthSubject.next(false)
  }

  login(email: string, password: string): Observable<ApiResponse<Credential>> {
    return this.http.post<Credential>('/auth/login', { email: email, password: password}).pipe(
      map( data => { 
        if (data.isSuccess){
          let successResponse: SuccessApiResponse<Credential> = data as SuccessApiResponse<Credential>
          this.saveCredentials(successResponse.data)
        }
        return data
      })
    )
  }

  signup(credential: SignupCredential): Observable<ApiResponse<Credential>>{
    return this.http.post('/users/register', credential).pipe(
      switchMap((registeredUser: SuccessApiResponse<User>) => {
        return this.login(registeredUser.data.email, credential.password)
      })
    )
  }

  logout(): Observable<boolean> {
    this.removeCredentials()
    return of(true)
  }
}
