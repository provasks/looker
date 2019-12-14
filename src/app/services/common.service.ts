import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Config } from "../content/config";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  getReturnUrl(): any {
    return this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  }
  getNavItems(): any[] {
    return Config["menu"];
  }
  constructor(private route: ActivatedRoute) {}

  private showHeader$ = new Subject<boolean>();
  getHeaderVisibility(): Observable<boolean> {
    return this.showHeader$.asObservable();
  }
  setHeaderVisibility(value) {
    this.showHeader$.next(value);
  }

  private popupData$ = new Subject<any>();
  getPopupData(): Observable<boolean> {
    return this.popupData$.asObservable();
  }
  setPopupData(value) {
    this.popupData$.next(value);
  }

  getPageSize(): number {
    return Config["pageSize"];
  }

  logout() {
    console.log("logged out automatically!");
  }
}
