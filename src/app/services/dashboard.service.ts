import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Config } from "../content/config";
import { Universe } from "../models/universe.model";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  selectedUniverses: Universe[] = [];
  getAuthTypes(): string[] {
    return Config["authenticationTypes"];
  }
  getPlatforms(): string[] {
    return Config["platforms"];
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
