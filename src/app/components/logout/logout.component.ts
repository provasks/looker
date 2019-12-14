import { Component, OnInit } from "@angular/core";
import { UserLoginService } from "src/app/authentication/user-login.service";
import {
  LoggedInCallback,
  CognitoUtil
} from "src/app/authentication/cognito.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit, LoggedInCallback {
  autoLogoutMessage: string =
    "You might be logged out automatically due to inactivity.";
  logoutMessage: string = "You have been logged out successfully.";

  constructor(public router: Router, public userService: UserLoginService) {
    this.userService.isAuthenticated(this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.userService.logout();
    }
  }

  ngOnInit() {}
}
