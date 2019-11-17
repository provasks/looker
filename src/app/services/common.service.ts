import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Config } from "../content/config";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  getNavItems(): any[] {
    return Config["menu"];
  }
  constructor() {}

  private showHeader$ = new Subject<boolean>();
  getHeaderVisibility(): Observable<boolean> {
    return this.showHeader$.asObservable();
  }
  setHeaderVisibility(value) {
    this.showHeader$.next(value);
  }

  getPageSize():number{
    return Config["pageSize"]
  }
}
