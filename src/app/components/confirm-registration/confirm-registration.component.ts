import { Component, OnInit } from "@angular/core";
import { UserRegistrationService } from "src/app/authentication/user-registration.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-confirm-registration",
  templateUrl: "./confirm-registration.component.html",
  styleUrls: ["./confirm-registration.component.scss"]
})
export class ConfirmRegistrationComponent implements OnInit {
  confirmationCode: string;
  email: string;
  errorMessage: string;
  private sub: any;

  constructor(
    public regService: UserRegistrationService,
    public router: Router,
    public route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params["mail"];
    });

    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onConfirmRegistration() {
    this.errorMessage = null;
    this.regService.confirmRegistration(
      this.email,
      this.confirmationCode,
      this
    );
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) {
      this.alertService.error(message);
      //error
      // this.errorMessage = message;
      // console.log("message: " + this.errorMessage);
    } else {
      //success
      //move to the next step
      this.alertService.success(
        "Registration Successful! <br/>Now you can login."
      );
      // this.configs.curUser = result.user;
      this.router.navigate(["/dashboard"]);
    }
  }
}
