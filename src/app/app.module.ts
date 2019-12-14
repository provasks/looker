import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AlerterComponent } from "./alerter/alerter.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { BillingSummaryComponent } from "./components/billing-summary/billing-summary.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { RegistrationComponent } from "./components/popups/registration/registration.component";
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { ResendCodeComponent } from './components/resend-code/resend-code.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AlerterComponent,
    LogoutComponent,
    BillingSummaryComponent,
    ProfileComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
