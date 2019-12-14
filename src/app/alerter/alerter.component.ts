import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { Alert, AlertType } from "src/app/models/alert.model";
declare var $: any;

@Component({
  selector: "app-alerter",
  templateUrl: "./alerter.component.html",
  styleUrls: ["./alerter.component.scss"]
})
export class AlerterComponent implements OnInit {
  alerts: Alert[] = [];
  subscription: any;
  title = "";

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService
      .getAlert()
      .subscribe((alert: Alert) => {
        if (!alert) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
        }
        const self = this;
        window.setTimeout(function() {
          self.removeAlert(alert);
        }, 5000);

        this.setAlertInfo(alert);
        // add alert to array
        this.alerts.push(alert);
      });
  }
  setAlertInfo(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        alert.background = "alert alert-success";
        alert.icon = "fa fa-check-circle";
        alert.color = "text-success";
        break;
      case AlertType.Error:
        alert.background = "alert alert-danger";
        alert.icon = "fa fa-times-circle";
        alert.color = "text-danger";
        break;
      case AlertType.Info:
        alert.background = "alert alert-info";
        alert.icon = "fa fa-info-circle";
        alert.color = "text-info";
        break;
      case AlertType.Warning:
        alert.icon = "fa fa-exclamation-circle";
        alert.background = "alert alert-warning";
        alert.color = "text-warning";
        break;
    }
  }

  removeAlert(alert: Alert) {
    $('div[id="alert_' + this.alerts.indexOf(alert) + '"]').fadeOut("slow"); //with animation effect
    // this.alerts = this.alerts.filter(x => x !== alert); //without animation
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
