import { LocalStoreService } from "./../services/local-store.service";
/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Credential } from "./../models";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isAuth: boolean = false;
  private isAuth$: Observable<Credential>;
  constructor(private router: Router, private localStore: LocalStoreService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isAuth$ = this.localStore.get('credential')
    this.isAuth$.subscribe(
      (credential) => {
        let { exp,token } = credential
        this.isAuth = (token && (Math.ceil(Date.now() / 1000) <= exp) ) ? true : false
      },
      () => this.isAuth = false
    )

    if (!this.isAuth) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
