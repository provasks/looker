export class Alert {
  type: AlertType;
  message: string;
  icon: string;
  background: string;
  color: string;
}

export enum AlertType {
  Success = "Success",
  Error = "Error",
  Info = "Info",
  Warning = "Warning"
}
