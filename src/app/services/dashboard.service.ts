import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  getAuthTypes(): string[] {
    return ["secEnterPrise", "Window Ad2", "Windows Ad3"];
  }
  constructor() {}
  getPlatforms(): string[] {
    return [
      "Business Object Server Universe",
      "Upload QlickView Workbooks",
      "Business Object Server"
    ];
  }

  platform$ = new Subject<any>();
  getPlatform(): Observable<any> {
    return this.platform$.asObservable();
  }
  setPlatform(value) {
    console.log("platform got changed");
    this.platform$.next(value);
  }
}
