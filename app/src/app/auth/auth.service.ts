import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    let user: User = this.currentUserSubject.value;
    return user;
  }

  async login(username: string, password: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
    const body = new HttpParams()
      .set('username', username)
      .set('pass', password)
      .set('tenant', 'tnt_41105')

    let data = await this.httpClient.post<any>(`api/auth/login`, body.toString(), { headers }).toPromise();
    console.log(data);

    if (data && data.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
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
      /*const token = JSON.parse(localStorage.getItem('currentUser')).token
      const headers = new HttpHeaders()
        .append('token', token)*/

      try {
        let data = await this.httpClient.get<any>(`api/auth/check-token`).toPromise();
        console.log(data);
      } catch (error) {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return false;
      }

      return true;
    }

    return false;
  }
}
