import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AlertService } from "../services/alert.service";
import { DashboardService } from "../services/dashboard.service";
import { AuthenticationService } from "../services/authentication.service";
import { BoServer } from "../models/bo-server.model";
import { CommonService } from "../services/common.service";
import { Universe } from "../models/universe.model";
import { Config } from "../content/config";
import { ApiService } from "../services/api.service";
declare var $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  /**Properties */
  get selectedPlatform() {
    return this.frmPlatform.get("selectedPlatform");
  }
  get platformProperty() {
    return this.frmPlatform.get("platformProperty");
  }

  get f() {
    return this.frmUniverse.controls;
  }

  /** public variables */
  authTypes: string[];
  universeList: Universe[];
  platformSelected: AbstractControl;
  isMultipleUniverseSelected: boolean;
  pager: any = {};
  paginatedUniverses: Universe[];
  // modalData: { title: string; body: string };

  sourceDatabaseList: any[];
  destinationDatabaseList: any[];
  selectedSourceDatabase: string;
  selectedDestinationDatabase: string;
  chkLookML: boolean;
  chkConvert: boolean;
  fileToUpload: File;
  isPlatformValid: boolean;

  frmUniverse: FormGroup;
  frmBusinessObject: FormGroup;
  frmPlatform: FormGroup;

  continueVal = 0;
  uploadSec = false;
  noContinue = true;
  univereSubmitEnable = false;
  uploadFileType = "";
  UploadfromBusinessUniverse = true;
  uploadIndividual = false;
  universesAccordian = false;
  enableBOServerInput = false;
  enableSnowflexDropdowns = false;
  fileName = "no file choose";

  platforms: string[];

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commonService: CommonService,
    private apiService: ApiService
  ) {
    this.commonService.setHeaderVisibility(true);

    this.dashboardService.getPlatform().subscribe(value => {
      this.platformSelected = value;
    });
    this.sourceDatabaseList = [...Config["databases"]];
    this.destinationDatabaseList = [...Config["databases"]];
    this.selectedSourceDatabase = Config["selectedSourceDatabase"];
    this.selectedDestinationDatabase = Config["selectedDestinationDatabase"];
    this.chkLookML = false;
    this.chkConvert = false;
  }

  /**Angular Life cycle Hook */
  ngOnInit() {
    this.setValidators();
    this.frmPlatform.setValue({
      platformProperty: "",
      selectedPlatform: ""
    });
    this.platforms = this.dashboardService.getPlatforms();
    this.authTypes = this.dashboardService.getAuthTypes();
  }

  /***************************************************************
   * This method is responsible to set the pager info
   ***************************************************************/
  setPageInfo() {
    this.pager.current = 1;
    this.pager.size = this.commonService.getPageSize();
    this.pager.count = Math.ceil(this.universeList.length / this.pager.size);
    this.pager.pages = [...Array(this.pager.count).keys()].map(i => i + 1);
  }

  /**********************************************************************
   * This method is responsible to set the pagintion information
   * after swithing the apge
   **********************************************************************/
  switchPage(currentPage: number) {
    this.pager.current = currentPage;
    const startIndex = this.pager.size * (this.pager.current - 1);
    this.paginatedUniverses = this.universeList.slice(
      startIndex,
      startIndex + this.pager.size
    );
  }

  /**************************************************************************
   * This method is responsible to updated the selected properties
   * of the Universe and also check the all the checkbox
   *************************************************************************/
  checkAll(ev) {
    this.universeList.forEach(x => (x.selected = ev.target.checked));
    this.setMulipleCheckStatus();
  }

  setMulipleCheckStatus() {
    this.isMultipleUniverseSelected =
      this.universeList.filter(u => u.selected).length > 1;
  }

  setValidators() {
    this.frmBusinessObject = this.formBuilder.group({
      system: ["WIN-FN2S7NQNABE:6400", [Validators.required]],
      userName: ["Administrator", [Validators.required]],
      password: ["Passw0rd", Validators.required],
      authenticationType: ["secEnterprise", Validators.required]
    });

    this.frmUniverse = this.formBuilder.group({
      selectUniverseFormValues: [""],
      serverAddressName: ["", [Validators.required]],
      adminUserNameName: ["", Validators.required],
      adminPassword: ["", Validators.required],
      uploadUniversesName: ["", [Validators.required]],
      repoWebsiteName: ["", [Validators.required]],
      githubTokenName: ["", [Validators.required]],
      lookMlOption: ["", [Validators.required]],
      snowflakeSyntax: ["", [Validators.required]]
    });

    this.frmPlatform = this.formBuilder.group({
      selectedPlatform: ["", [Validators.required]],
      platformProperty: ["", [Validators.required]]
    });
  }

  selectForm(event) {
    console.log(event.target.value);
    let formValue = event.target.value;
    if (formValue == "UploadIndividualUniverses") {
      this.uploadIndividual = true;
      this.UploadfromBusinessUniverse = false;
    } else if (formValue == "UploadfromBusiness") {
      this.UploadfromBusinessUniverse = true;
      this.uploadIndividual = false;
    }
  }

  continueForm() {
    this.continueVal = this.continueVal + 1;
    if (this.continueVal == 1) {
      this.uploadSec = true;
      this.noContinue = false;
      this.univereSubmitEnable = true;
    }
  }

  onPlatformChange(value) {
    this.frmPlatform.setValue({
      platformProperty: "",
      selectedPlatform: value
    });
    this.isPlatformValid = false;
  }
  handleFileInput(files?: FileList) {
    this.fileToUpload = files.item(0);

    this.isPlatformValid = this.ValidatePlatform(this.fileToUpload.name);
  }
  submitPlatform() {
    this.apiService.postFiles(this.fileToUpload).subscribe(
      resp => {
        if (resp.partialText) {
          const response = JSON.parse(resp.partialText);
          const list: Universe[] = [
            {
              universeName: response.fileName,
              folderPath: response.folderPath,
              status: response.status
            }
          ];
          this.showUniverseList(list);
          console.log(response);
          this.alertService.success(response.message);
        }
      },
      error => {
        this.alertService.error(JSON.parse(error.partialText)["message"]);
        console.log(error);
      }
    );
  }

  ValidatePlatform(file) {
    const extension = this.fileToUpload.name.split(".").pop();
    if (this.selectedPlatform.value === "Upload QlickView Workbooks") {
      return extension === "qvd";
    } else {
      return extension === "unx";
    }
  }

  SapBusinessLogin() {
    const boServer: BoServer = {
      system: this.frmBusinessObject.controls["system"].value,
      userName: this.frmBusinessObject.controls["userName"].value,
      password: this.frmBusinessObject.controls["password"].value,
      authenticationType: this.frmBusinessObject.controls["authenticationType"]
        .value
    };
    $("#UniverseAuthentication").modal("hide");
    this.authService.BoServerLogin(boServer).subscribe(
      response => {
        if (response !== null) {
          this.showUniverseList(response);
          this.alertService.success("BO server Login successful.");
        } else {
          this.alertService.error("Authentication Failed.");
        }
      },
      error =>
        this.alertService.error(
          `${error.error.error} - <br/>Check if the server is up`
        )
    );
  }
  showUniverseList(list: Universe[]) {
    this.universeList = list;
    this.universeList.forEach(u => {
      u["selected"] = false;
    });
    this.setPageInfo();
    this.switchPage(1);
    this.dashboardService.setPlatform(this.selectedPlatform);
    this.universesAccordian = true;
  }

  onAuthChange(value) {
    console.log(value);
  }

  onConvertClick(universe: Universe) {
    this.dashboardService.selectedUniverses.length = 0;
    this.dashboardService.selectedUniverses.push(universe);
  }
  onGlobalConvertClick() {
    this.dashboardService.selectedUniverses = this.universeList.filter(
      u => u.selected
    );
  }
  submitUniverseList() {
    if (!this.dashboardService.selectedUniverses) return;
    const universeList: { universeName: string; folderPath: string }[] = [];
    this.dashboardService.selectedUniverses.forEach(universe =>
      universeList.push({
        universeName: universe.universeName,
        folderPath: universe.folderPath
      })
    );

    const request: any = {
      universes: universeList,
      platform: this.selectedPlatform.value
    };
    this.apiService.submitUniverses(request).subscribe(
      resp => {
        $("#frmPlatform").modal("hide");
        console.log(resp);
        this.alertService.success(resp.message);
      },
      error => {
        $("#frmPlatform").modal("hide");
        console.log(error);
        this.alertService.error(error.message);
      }
    );
  }
}
