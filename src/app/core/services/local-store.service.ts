import { Observable, of } from 'rxjs';
import { IStore } from './istore';
import { Injectable } from '@angular/core';
import { Credential } from "./../models";
@Injectable({
  providedIn: 'root'
})

export class LocalStoreService implements IStore {

  constructor() { }

  get(name: string): Observable<Credential> {
    let credential: Credential = JSON.parse(localStorage.getItem(name))
    return of(credential)
  }

  set(name: string, value: any): Observable<boolean> {
    localStorage.setItem(name, JSON.stringify(value))
    return of(true)
  }

  remove(name: string): Observable<boolean> {
    localStorage.removeItem(name)
    return of(true)
  }
}
