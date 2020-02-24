import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    let userService = this.injector.get(UserService);

    if(!req.headers.has('x-auth')){
      let clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userService.getToken()}`
        }
      });
      return next.handle(clonedReq);
    }
    
    return next.handle(req);
  }
}
