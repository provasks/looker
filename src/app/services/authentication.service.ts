import { Injectable } from "@angular/core";
import { BoServer } from "../models/bo-server.model";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { Universe } from "../models/universe.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private apiService: ApiService) {}
  BoServerLogin(boServer: BoServer): Observable<Universe[]> {
    return this.apiService.getUniverses(boServer);
  }

  // login(username: string, password: string) {
  //   const uName = "provas@trianz.com";
  //   const pWord = "123";
  //   return username === uName && password === pWord;
  // }

  // login(username: string, password: string): boolean {
  //   return this.authenticate(username, password);
  //   // return this.http
  //   //   .post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
  //   //   .pipe(
  //   //     map(user => {
  //   //       // login successful if there's a jwt token in the response
  //   //       if (user && user.token) {
  //   //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //   //         localStorage.setItem("currentUser", JSON.stringify(user));
  //   //       }

  //   //       return user;
  //   //     })
  //   //   );
  // }
  // authenticate(username: string, password: string): any {
  //   const uName = "provas@trianz.com";
  //   const pWord = "123";
  //   if (username === uName && password === pWord) {
  //     const user = { username: username, password: password };
  //     localStorage.setItem("currentUser", JSON.stringify(user));
  //     return true;
  //   }
  //   return false;
  // }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem("currentUser");
  // }
}
