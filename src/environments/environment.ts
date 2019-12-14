// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  region: "ap-southeast-1",
  identityPoolId: "ap-southeast-1:d44609c7-9af7-44fd-8108-cdad0ae1a354",
  userPoolId: "ap-southeast-1_ZuWHwVu9K",
  clientId: "3nkj917d2t9esjep9km9mhl879",

  rekognitionBucket: "rekognition-pics",
  albumName: "usercontent",
  bucketRegion: "ap-southeast-1",

  ddbTableName: "LoginTrail",

  cognito_idp_endpoint: "",
  cognito_identity_endpoint: "",
  sts_endpoint: "",
  dynamodb_endpoint: "",
  s3_endpoint: ""
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
