import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { LogoutComponent } from "./components/logout/logout.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BillingSummaryComponent } from "./components/billing-summary/billing-summary.component";
import { ConfirmRegistrationComponent } from "./components/confirm-registration/confirm-registration.component";
import { ResendCodeComponent } from "./components/resend-code/resend-code.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "confirm-registration/:mail",
    component: ConfirmRegistrationComponent
  },
  { path: "resend-code", component: ResendCodeComponent },
  {
    path: "billing-summary",
    component: BillingSummaryComponent,
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
