import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {APIService} from "./api.service";

@Injectable()
export class UserService extends APIService {

  private user: Object = {};
  constructor(http: Http) {
    super(http);
    this.update(null, null);
  }

  // Getters and setters
  get info() {
    return this.user;
  }

  setUser(user: Object) {
    this.user = user;
  }

  get loggedIn() {
    if (this.user["id"]) {
      return true;
    }

    return false;
  }

  /**
   * Update a users session, call after login, register or whenever we need new user data
   * @param callback
     */
  update(callback, err) {

    // removes stack trace errors on callbacks
    if (err === null) {
      err = () => {};
    }
    if (callback === null) {
      callback = () => {};
    }

    var self = this;
    function onResponse(data) {
      console.log("Session update: " + data.success);
      if (data.success) {

        self.user = data.result;
        callback();
      } else {
        err();
      }
    }

    this.http.get(this.url("/user"), {withCredentials:true})
      .map(this.extractData)
      .subscribe(body => onResponse(body));
  }

}
