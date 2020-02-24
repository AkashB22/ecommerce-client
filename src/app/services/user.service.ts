import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private users = 'http://localhost:3000/users';
  private xAuthHeader = {
    headers : new HttpHeaders({
      'x-auth' : 'false'
    })
  };
  private authStatusListener = new Subject<any>();

  signupUser(user){
    this.http.post(`${this.users}/signup`, user, this.xAuthHeader)  
      .subscribe(
        (response)=>{
          let token = response['token'];
          this.token = token
          if(token){
            const expiresInDuration = response['expiresIn'];
            this.isAuthenticated = true;
            this.setAuthTimer(expiresInDuration);
            this.userId = response['userId'];
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['home']);
          }
        }
      )
  }

  signinUser(user){
    this.http.post(`${this.users}/signin`, user, this.xAuthHeader)
      .subscribe(
        (response)=>{
          let token = response['token'];
          this.token = token;
          if(token){
            this.isAuthenticated = true;
            this.userId = response['userId'];
            const expiresInDuration = response['expiresIn'];
            this.setAuthTimer(expiresInDuration);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['home']);
          }
        }
      )
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['home']);
  }

  getProfile(){
    return this.http.get(`${this.users}/profile`)
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return ;
    } 
    const now = new Date();
    const expiresIn = authInformation['expirationDate'].getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token, expirationDate, userId){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if(!token || !expirationDate){
      return ;
    }
    return {
      token: token,
      expirationDate : new Date(expirationDate),
      userId: userId
    }
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getToken(){
    return this.token;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  private setAuthTimer(duration: number){
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
