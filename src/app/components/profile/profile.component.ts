import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import {
  LoggedInCallback,
  CognitoUtil
} from "src/app/authentication/cognito.service";
import { Router } from "@angular/router";
import { UserParametersService } from "src/app/authentication/user-parameters.service";
import { Parameter } from "src/app/authentication/models/parameter.model";
import { GetParametersCallback } from "src/app/authentication/models/get-parameters-callback.model";
import { UserLoginService } from "src/app/authentication/user-login.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, LoggedInCallback {
  public parameters: Array<Parameter> = [];
  public cognitoId: String;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private userParamService: UserParametersService,
    private cognitoUtil: CognitoUtil,
    private userService: UserLoginService
  ) {
    this.userService.isAuthenticated(this);
  }

  ngOnInit() {
    this.commonService.setHeaderVisibility(true);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.router.navigate(["/login"]);
    } else {
      this.userParamService.getParameters(
        new GetParametersCallback(this, this.cognitoUtil)
      );
      // this.userParamService.getParameters(this.showParameters());
    }
  }
}
