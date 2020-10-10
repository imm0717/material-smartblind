import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigurationContext } from './configuration-context';

@NgModule()
export class ConfigurationModule {
  static forRoot(config: ConfigurationContext): ModuleWithProviders {
    return {
      ngModule: ConfigurationModule,
      providers: [
        {
          provide: ConfigurationContext,
          useValue: config
        }
      ]
    }
  }
 }
