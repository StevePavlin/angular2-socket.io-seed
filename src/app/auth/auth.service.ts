import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Router} from '@angular/router'
import {APIService, UserService} from "../shared";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService extends APIService {

  constructor(http:Http, private user:UserService, private router:Router) {
    super(http);
  }

  private previousRoute = "/dashboard";

  redirect() {
    this.router.navigate([this.previousRoute]);
  }


  /**
   * Login a user
   * @param username
   * @param password
   * @returns {Observable<Request>}
   */
  login(username:string, password:string) {
    var request = this.prepareRequest({
      username: username,
      password: password
    });

    return this.http.post(this.url('/login'), request.body, request.options)
        .map(this.extractData);
  }

  /**
   * Register a user
   * @param username
   * @param password
   * @returns {Observable<Request>}
   */
  register(username:string, password:string) {
    var request = this.prepareRequest({
      username: username,
      password: password
    });

    return this.http.post(this.url('/register'), request.body, request.options)
        .map(this.extractData);
  }

  /**
   * Logout a user, set the user object to empty
   * @param callback
   */
  logout(callback) {
    var self = this;

    function onResponse(data) {
      if (data.success) {
        self.user.setUser({});
        callback();
      }
    }

    this.http.get(this.url("/logout"), {withCredentials: true})
        .map(this.extractData)
        .subscribe(body => onResponse(body));
  }

  authUser(redirectRoute): Observable<boolean> | boolean {

    this.previousRoute = redirectRoute;
    var self = this;

    if (this.user.loggedIn) {
      return true
    }

    function onResponse(data) {
      if (data.success) {
        self.user.setUser(data.result);
      } else {
        console.log("test");
        self.router.navigate(['/auth/login']);
        self.user.setUser({});
      }
    }

    return this.http.get(this.url("/user"), {withCredentials: true})
        .map(res => {
          var body = res.json();
          onResponse(body);
          return body.success;
        });
  }

  authLogin() : Observable<boolean> | boolean{
    var self = this;

    if (this.user.loggedIn) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    function onResponse(data) {
      if (data.success) {
        self.user.setUser(data.result);
        self.router.navigate(['/dashboard']);
      }
    }

    return this.http.get(this.url("/user"), {withCredentials: true})
        .map(res => {
          var body = res.json();
          onResponse(body);
          return !body.success;
        });
  }
}