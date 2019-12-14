import { Parameter } from "./parameter.model";
import { CognitoUtil } from "../cognito.service";
import { ProfileComponent } from "src/app/components/profile/profile.component";

export class GetParametersCallback {
  constructor(public me: ProfileComponent, public cognitoUtil: CognitoUtil) {}

  callback() {}

  callbackWithParam(result: any) {
    for (let i = 0; i < result.length; i++) {
      let parameter = new Parameter();
      parameter.name = result[i].getName();
      parameter.value = result[i].getValue();
      this.me.parameters.push(parameter);
    }
    let param = new Parameter();
    param.name = "cognito ID";
    param.value = this.cognitoUtil.getCognitoIdentity();
    this.me.parameters.push(param);
  }
}
