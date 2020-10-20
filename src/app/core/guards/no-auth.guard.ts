import { LocalStoreService } from "./../services/local-store.service";
/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Credential } from "./../models";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  private isAuth: boolean = false;
  private isAuth$: Observable<Credential>;
  constructor(private router: Router, private localStore: LocalStoreService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isAuth$ = this.localStore.get('credential')
    this.isAuth$.subscribe(
      (credential) => this.isAuth = (credential) ? true : false,
      () => this.isAuth = false
    )

    if (this.isAuth) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
