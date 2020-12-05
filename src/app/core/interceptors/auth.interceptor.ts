import { LocalStoreService } from './../services/local-store.service';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private localStoreService: LocalStoreService) {


    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        let reqCloned: HttpRequest<any>
        let localStoreSuscriber: Subscription
        localStoreSuscriber = this.localStoreService.get('credential').subscribe(
            (data) => {
                if (data) 
                    reqCloned = req.clone({
                        headers: req.headers.set('Authorization', 'Bearer ' + data.token)
                    })
                else
                    reqCloned = req
            }
        )

        localStoreSuscriber.unsubscribe()
        return next.handle(reqCloned);
    }
}