import { Component, OnInit, Input } from "@angular/core";
import { UserRegistrationService } from "src/app/authentication/user-registration.service";
import { User } from "src/app/authentication/models/user.model";
import { CognitoCallback } from "src/app/authentication/cognito.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit, CognitoCallback {
  user: User = {
    name: "",
    phone_number: "",
    email: "",
    password: ""
  };
  errorMessage: any;
  // user: User;
  constructor(
    private registrationService: UserRegistrationService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  onRegister() {
    this.errorMessage = null;
    this.registrationService.register(this.user, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) {
      this.alertService.error(message);
      //error
    } else {
      //success
      //move to the next step
      console.log("redirecting");
      this.router.navigate(["/confirm-registration", result.user.username]);
    }
  }
}
