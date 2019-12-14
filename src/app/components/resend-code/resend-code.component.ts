import { Component, OnInit } from "@angular/core";
import { UserRegistrationService } from "src/app/authentication/user-registration.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/services/alert.service";
import { CognitoCallback } from "src/app/authentication/cognito.service";
import { User } from "src/app/authentication/models/user.model";

@Component({
  selector: "app-resend-code",
  templateUrl: "./resend-code.component.html",
  styleUrls: ["./resend-code.component.scss"]
})
export class ResendCodeComponent implements OnInit, CognitoCallback {
  email: string;
  errorMessage: string;
  user: User = {
    name: "",
    phone_number: "",
    email: "",
    password: ""
  };

  constructor(
    public registrationService: UserRegistrationService,
    public router: Router,
    private alertService: AlertService
  ) {
    this.user.email = "";
  }

  ngOnInit() {}
  resendCode() {
    this.registrationService.resendCode(this.user.email, this);
  }

  cognitoCallback(error: any, result: any) {
    if (error != null) {
      this.alertService.error("Something went wrong...please try again");
    } else {
      this.alertService.error(
        "Verification code is sent. Please check your mail."
      );
      this.router.navigate(["/confirm-registration", this.user.email]);
    }
  }
}
