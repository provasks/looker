import { Injectable } from "@angular/core";
import { BoServer } from "../models/bo-server.model";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { Universe } from "../models/universe.model";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private apiService: ApiService) {}
  BoServerLogin(boServer: BoServer): Observable<Universe[]> {
    return this.apiService.getUniverses(boServer);
  }

  login(username: string, password: string) {
    const uName = "provas@trianz.com";
    const pWord = "123";
    return username === uName && password === pWord;
  }
}
