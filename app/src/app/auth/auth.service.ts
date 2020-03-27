import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentEnvSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public currentEnviroment: Observable<User>;

  constructor(private httpClient: HttpClient , private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentEnvSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentEnviroment')));
    this.currentEnviroment = this.currentEnvSubject.asObservable();
  }

  public get currentUserValue(): User {
    let user: User = this.currentUserSubject.value;
    return user;
  }

  public get currentEnvValue(): User {
    let user: User = this.currentEnvSubject.value;
    return user;
  }

  async login(Authorization: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', Authorization)
    const body = new HttpParams()
      .set('Authorization', Authorization)

    let data = await this.httpClient.post<any>(`api/auth/login`, body.toString(), { headers }).toPromise();
    
    if (data && data.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.save_currentUser(data);
    }

    return data;
  }

  async logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public async check_token() {
    if (localStorage.getItem('currentUser')) {
      const token = "Bearer " + JSON.parse(localStorage.getItem('currentUser')).token
      const headers = new HttpHeaders()
        .append('Authorization', token)
        .append('Token', JSON.parse(localStorage.getItem('currentUser')).token)

      try {
        let data = await this.httpClient.get<any>(`api/auth/check-token`, { headers }).toPromise();
      } catch (error) {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return false;
      }

      return true;
    }

    return false;
  }

  public save_currentUser(data) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }

  public save_currentEnviroment(data) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentEnviroment', JSON.stringify(data));
    this.currentEnvSubject.next(data);
  }


}
