import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from 'src/app/shared/constants/urls';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { User } from 'src/app/shared/models/User';
const USER_KEY = "isAuthenticated";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public userSubject = new BehaviorSubject<User>(new User());
  public userSubjectObservable: Observable<User>;
  constructor(private http: HttpClient) {
    this.userSubjectObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin) : Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin);
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.setItem(USER_KEY, "false");
  }

  setAuthInfo(user: User) {
    localStorage.setItem(USER_KEY, user.token? "true": "false");
  }

  getAuthInfo() {
    const userInfo = localStorage.getItem(USER_KEY);
    return userInfo === "true" ? true: false
  }

  registerUser(newUser: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, newUser);
  }

  currentUser(): User {
    return this.userSubject.value;
  }

}
