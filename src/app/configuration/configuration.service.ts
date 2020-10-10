import { Injectable, Optional } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ConfigurationContext } from './configuration-context';
import { IConfiguration } from './config/i-configuration';

@Injectable()
export class ConfigurationService {

  private settingsSubject: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
  public readonly settings$: Observable<IConfiguration> = this.settingsSubject.asObservable();

  constructor( @Optional() configContext: ConfigurationContext ) {
    if (configContext)
      this.settingsSubject.next(configContext.config);
   }
}
