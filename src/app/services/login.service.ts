import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';

export class JWT {
  jwt: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASE_URL: string = 'http://localhost:9090';
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('access_token'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get isLoggedIn(): string {
    return this.currentUserSubject.value;
  }

  authenticate(credential: any) {
    return this.http.post<JWT>(`${this.BASE_URL}/authenticate`, credential)
      .pipe(map(user => {
        localStorage.setItem('access_token', user.jwt);
        this.currentUserSubject.next(user.jwt);
        return user.jwt;
      }));
  }
  logout() {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    location.reload(true);
  }

  register(user: User) {
    return this.http.post(`${this.BASE_URL}/register`, user);
  }
}
