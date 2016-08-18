import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {UserService} from "../../shared";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [AlertComponent, ROUTER_DIRECTIVES],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  error = null;

  constructor(private authService: AuthService, private user: UserService) {

  }

  ngOnInit() {

  }

  onSubmit (username: string, password: string) {

    var self = this;
    function onResponse(data) {
      if (data.success) {
        self.user.update(function() {
          self.authService.redirect();
        }, null);
      } else {
        self.error = data.error;
      }
    }

    this.authService.login(username, password)
        .subscribe(data => onResponse(data))

  }


  clearError() {
    this.error = null;
  }

}