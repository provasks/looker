import { Component, OnInit } from "@angular/core";
import { CommonService } from "./services/common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "looker";
  navHeader: boolean;
  navItems: any[];
  constructor(private commonService: CommonService) {
    // setTimeout( () => {this.navHeader = this.cmnSer.navHeader;}, 1000 )
  }

  ngOnInit() {
    this.navItems = this.commonService.getNavItems();
    // setTimeout( () => {this.navHeader = this.cmnSer.navHeader;}, 1000 )
    // this.cmnSer.navData.subscribe(x => (this.navHeader = x));
    this.commonService
      .getHeaderVisibility()
      .subscribe(state => (this.navHeader = state));
  }
}
