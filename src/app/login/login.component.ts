import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../services/alert.service";
import { AuthenticationService } from "../services/authentication.service";
import { CommonService } from "../services/common.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // loading = false;
  // submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private commonService: CommonService
  ) {
    this.commonService.setHeaderVisibility(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  /**Alias for Login form control */
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const status = this.authService.login(
      this.loginForm.controls.username.value.trim(),
      this.loginForm.controls.password.value.trim()
    );
    if (status) {
      this.router.navigate(["/dashboard"]);
      // this.cmnSer.updatedDataSelection(true);
      // this.router.navigate([])
    } else {
      this.alertService.error("Login failed.");
    }
  }
}
