import { Injectable } from "@angular/core";
import { BoServer } from "../models/bo-server.model";
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Universe } from "../models/universe.model";

import { Config } from "../content/config";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  submitUniverses(request: any): Observable<any> {
    let url = "";
    switch (request.platform) {
      case "Business Object Server Universe":
        url = `${Config.apiUrl}/bo/universe/lookml`;
        return this.httpClient
          .post(url, JSON.stringify(request.universes), {
            headers: new HttpHeaders().set("Content-Type", "application/json")
          })
          .pipe(map(response => response));
      default:
        url = `${Config.s3_Server}/LegacyToLooker/789afhkljafd?fileLocation=${request.universes[0]["universeName"]}&githubLocation=asldkfjaslkf&clientName=lsflkff`;
        return this.httpClient.post(url, {}).pipe(map(response => response));
      // const params = {
      //   fileLocation: request.universes[0]["universeName"],
      //   githubLocation: "asldkfjaslkf",
      //   clientName: "lsflkff"
      // };
    }
  }

  /*************************************************************
   * This method is responsible to upload the content of
   * the file to the S3 Bucket
   * @param file File which will be uploaded
   *************************************************************/
  postFiles(file: File): Observable<any> {
    const url = `${Config.apiUrl}/bo/uploadFile`;
    let formdata: FormData = new FormData();
    formdata.append("file", file);
    const req = new HttpRequest("POST", url, formdata, {
      reportProgress: true,
      responseType: "text"
    });
    return this.httpClient.request(req);
  }
  /**********************************************************
   * This api is responsible to return a list of universes
   * based on the request object
   *********************************************************/
  getUniverses(boServer: BoServer): Observable<any> {
    const url = `${Config.apiUrl}/bo/universes`;
    // return of(Config["universeList"]).pipe(map(x => x as Universe[]));
    return this.httpClient
      .post(url, boServer, {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      })
      .pipe(map(response => response));
  }

  constructor(private httpClient: HttpClient) {}
}
