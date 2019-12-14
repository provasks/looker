import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { CognitoUtil } from "../authentication/cognito.service";
import CognitoIdToken from "../authentication/CognitoIdToken";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let cognitoUser = this.cognitoUtil.getCurrentUser();
    if (cognitoUser !== null) {
      // logged in so return true
      return true;
    }

    // if (!this.isTokenExpired(cognitoUser)) return true;

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  isTokenExpired(user) {
    if (user != null)
      user.getSession(function(err, session) {
        const idToken = session.getIdToken().getJwtToken();
        const cognitoIdToken = new CognitoIdToken(idToken);
        // const this.lastInteractionTime = Date.now();
        return err ? false : session.isValid() ? true : false;
      });
    else return false;
  }

  constructor(private router: Router, public cognitoUtil: CognitoUtil) {}
}
