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
  private users = 'http://localhost:3002/users';
  private index = 'http://localhost:3002';
  private xAuthHeader = {
    headers : new HttpHeaders({
      'x-auth' : 'false'
    })
  };
  private authStatusListener = new Subject<any>();
  private signinStatusListener = new Subject<any>();
  private signupStatusListener = new Subject<any>();
  private forgetPasswordListener = new Subject<any>();
  private profileListener = new Subject<any>();

  signupUser(user){
    this.http.post(`${this.users}/signup`, user)  
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
        },
        (error)=>{
          this.signupStatusListener.next(error);
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
            this.userId = window.atob(response['token'].split('.')[1]);
            const expiresInDuration = response['expiresIn'];
            this.setAuthTimer(expiresInDuration);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['home']);
          }
        },
        (error)=>{
          this.signinStatusListener.next(error);
        }
      )
  }

  updateUser(user){
    this.http.put(`${this.users}/update`, user)
      .subscribe(
        response=>{
          this.profileListener.next(response)
        });
  }

  forgetPassword(email){
    this.http.post(`${this.users}/forgetPassword`, email, this.xAuthHeader)
      .subscribe(
        response =>{
          this.forgetPasswordListener.next(response);
        },
        error =>{
          this.forgetPasswordListener.next(error);
        }
      )
  }

  resetPasswordLink(token){
    return this.http.get(`${this.users}/resetPasswordLink/${token}`, this.xAuthHeader);
  }

  resetPassword(token, password){
    this.http.post(`${this.users}/resetPassword/${token}`, password, this.xAuthHeader)
    .subscribe(
      response=>{
        let token = response['token'];
        this.token = token;
        if(token){
          this.isAuthenticated = true;
          this.userId = window.atob(response['token'].split('.')[1]);
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
    );
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
    this.http.get(`${this.users}/profile`)
      .subscribe(
        response=>{
          this.profileListener.next(response);
        },
        error=>{
          this.profileListener.next(error);
        }
      )
  }

    getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getSigninStatusListener(){
    return this.signinStatusListener.asObservable();
  }

  getSignupStatusListener(){
    return this.signupStatusListener.asObservable();
  }

  getForgetPasswordListener(){
    return this.forgetPasswordListener.asObservable();
  }

  getProfileListener(){
    return this.profileListener.asObservable();
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

  private setAuthTimer(duration: number){
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
