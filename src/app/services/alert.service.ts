import { Injectable } from "@angular/core";
import { Alert, AlertType } from "../models/alert.model";
import { Subject, Observable } from "rxjs";
import { NavigationStart, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  private alert$ = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.alert$.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.setAlert(AlertType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.setAlert(AlertType.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.setAlert(AlertType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.setAlert(AlertType.Warning, message, keepAfterRouteChange);
  }

  setAlert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alert$.next(<Alert>{ type: type, message: message });
  }

  clear() {
    // clear alerts
    this.alert$.next();
  }
}
