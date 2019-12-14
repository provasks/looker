import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamoDBService } from "./ddb.service";
import { CognitoUtil } from "./cognito.service";
import { AwsUtil } from "./aws.service";
import { UserRegistrationService } from "./user-registration.service";
import { UserLoginService } from "./user-login.service";
import { UserParametersService } from "./user-parameters.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    DynamoDBService,
    CognitoUtil,
    AwsUtil,
    UserRegistrationService,
    UserLoginService,
    UserParametersService
  ]
})
export class AuthenticationModule {}
