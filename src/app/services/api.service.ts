import { Injectable } from "@angular/core";
import { BoServer } from "../models/bo-server.model";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
// import "rxjs/add/observable/of";
import { map } from "rxjs/operators";
import { Universe } from "../models/universe.model";

import { Config } from "../content/config";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  /**********************************************************
   * This api is responsible to return a list of universes
   * based on the request object
   *********************************************************/
  getUniverses(boServer: BoServer): Observable<any> {
    return of(Config["universeList"]).pipe(map(x => x as Universe[]));
    // return this.httpClient
    //   .post(`${Config.baseUrl}/bo/universes`, boServer, {
    //     headers: new HttpHeaders().set("Content-Type", "application/json")
    //   })
    //   .pipe(map(response => response));
  }

  constructor(private httpClient: HttpClient) {}
}
