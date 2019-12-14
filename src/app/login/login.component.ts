import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../services/alert.service";
import { AuthenticationService } from "../services/authentication.service";
import { CommonService } from "../services/common.service";
import {
  CognitoCallback,
  LoggedInCallback
} from "../authentication/cognito.service";
import { DynamoDBService } from "../authentication/ddb.service";
import { UserLoginService } from "../authentication/user-login.service";
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent
  implements CognitoCallback, LoggedInCallback, OnInit {
  loginForm: FormGroup;
  returnUrl: any;

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigate([this.returnUrl]);
    }
  }
  cognitoCallback(message: string, result: any) {
    if (message != null) {
      //error
      this.alertService.error(message);
    } else {
      //success
      this.ddb.writeLogEntry("login");
      this.router.navigate([this.returnUrl]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // username: [
      //   "Provas.Saha@trianz.com",
      //   [Validators.required, Validators.email]
      // ],
      // password: ["Cisco!56", Validators.required]
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this.returnUrl = this.commonService.getReturnUrl();
  }

  /**Alias for Login form control */
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.authenticate(
      this.f.username.value.trim(),
      this.f.password.value.trim(),
      this
    );
  }

  onRegisterClick() {
    $("#registration-modal").modal({
      backdrop: "static",
      keyboard: false
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private commonService: CommonService,

    public ddb: DynamoDBService,
    public userService: UserLoginService
  ) {
    this.commonService.setHeaderVisibility(false);
  }
}
