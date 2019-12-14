import { Injectable } from "@angular/core";
import { UserLoginService } from "../authentication/user-login.service";
import { Router } from "@angular/router";
import { Config } from "../content/config";

@Injectable({
  providedIn: "root"
})
export class IdleTimerService {
  idleTimer: any;

  resetTimer() {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.router.navigate(["/logout"]);
      clearTimeout(this.idleTimer);
    }, Config["idleLogoutTime"]);
  }

  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) {
    window.onload = this.resetTimer.bind(this);
    window.onmousemove = this.resetTimer.bind(this); // catches mouse movements
    window.onmousedown = this.resetTimer.bind(this); // catches mouse movements
    window.onclick = this.resetTimer.bind(this); // catches mouse clicks
    window.onscroll = this.resetTimer.bind(this); // catches scrolling
    window.onkeypress = this.resetTimer.bind(this); //catches keyboard action
  }
}
