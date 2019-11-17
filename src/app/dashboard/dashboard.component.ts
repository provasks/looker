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
declare var $: any;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  authTypes: string[];
  universeList: Universe[];
  platformSelected: AbstractControl;
  isMultipleSelected: boolean;
  pager: any = {};
  paginatedUniverses: Universe[];

  /**Properties */
  get selectedPlatform() {
    return this.frmPlatform.get("selectedPlatform");
  }
  get platformProperty() {
    return this.frmPlatform.get("platformProperty");
  }

  continueVal = 0;
  uploadSec = false;
  noContinue = true;
  univereSubmitEnable = false;
  myFile = null;
  csvfileError = false;
  uploadFileType = "";
  frmUniverse: FormGroup;
  frmBusinessObject: FormGroup;
  frmPlatform: FormGroup;
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
    private commonService: CommonService
  ) {
    this.commonService.setHeaderVisibility(true);

    this.dashboardService.getPlatform().subscribe(value => {
      this.platformSelected = value;
    });
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

  switchPage(currentPage: number) {
    this.pager.current = currentPage;
    const startIndex = this.pager.size * (this.pager.current - 1);
    this.paginatedUniverses = this.universeList.slice(
      startIndex,
      startIndex + this.pager.size
    );
  }

  checkAll(ev) {
    this.universeList.forEach(x => (x.selected = ev.target.checked));
    this.setMulipleCheckStatus();
  }

  setMulipleCheckStatus() {
    this.isMultipleSelected =
      this.universeList.filter(u => u.selected).length > 1;
  }

  ngOnInit() {
    this.setValidators();
    this.platforms = this.dashboardService.getPlatforms();
    this.authTypes = this.dashboardService.getAuthTypes();
  }
  setValidators() {
    this.frmBusinessObject = this.formBuilder.group({
      system: ["WIN-FN2S7NQNABE:6400", [Validators.required]],
      userName: ["Administrator", [Validators.required]],
      password: ["Passw0rd", Validators.required],
      authenticationType: ["secEnterPrise", Validators.required]
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
      snowflakeSyntax: ["", [Validators.required]],
      SourceDatabaseSyntaxName: ["", [Validators.required]],
      DestinationSyntaxName: ["", [Validators.required]]
    });

    this.frmPlatform = this.formBuilder.group({
      // selectedUniverse: ["", [Validators.required]],
      selectedPlatform: ["", [Validators.required]],
      platformProperty: ["", [Validators.required]]
    });

    // console.log(this.frmPlatform.valid);
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
    // alert('continue : ' + this.continueVal);
    if (this.continueVal == 1) {
      // alert('true');
      this.uploadSec = true;
      this.noContinue = false;
      this.univereSubmitEnable = true;
      // alert('upload sec: ' + this.uploadSec);
    }
  }

  onPlatformChange(value) {
    this.frmPlatform.setValue({
      platformProperty: "",
      selectedPlatform: value
    });
  }

  enabledropdownsSnowfalke(event) {
    this.enableSnowflexDropdowns = event.target.checked;
  }

  selectUniverse() {
    this.showContinue();
  }

  showContinue() {
    this.continueVal = 0;
    this.uploadSec = false;
    this.noContinue = true;
  }

  universesSubmit() {
    alert("universes submit");
    // console.log(this.frmUniverse.value)
    $("#platformForm").modal("hide");
    // console.log(this.frmUniverse.value);
  }

  ValidFileFormat(control: AbstractControl) {
    if (this.uploadFileType != "") {
      if (this.uploadFileType == "csv") {
        return { validUrl: true };
      }
      return null;
    }
  }

  uploadFile(fileEvent) {
    // console.log(this.frmUniverse.controls.uploadUniversesName.name )
    alert("file upload");

    const file = fileEvent.target.files[0];
    console.log("fileName" + file.name);
    console.log("size", file.size);
    console.log("type", file.type);
    this.uploadFileType = file.type;

    if (file.type == "application/vnd.ms-excel") {
      var formData = new FormData();
      formData.append("file", file);
      // console.log(formData);
      this.myFile = formData;
      this.fileName = file.name;
      console.log(this.myFile);
    } else {
      this.csvfileError = true;
      console.log(fileEvent);
      fileEvent.target.value = "";
      this.fileName = "no file choose";
    }
  }

  SapBusinessLogin() {
    // if (this.frmBusinessObject.invalid) {
    //   return;
    // }
    const boServer: BoServer = {
      system: this.frmBusinessObject.controls["system"].value,
      userName: this.frmBusinessObject.controls["userName"].value,
      password: this.frmBusinessObject.controls["password"].value,
      authenticationType: this.frmBusinessObject.controls["authenticationType"]
        .value
    };
    this.authService.BoServerLogin(boServer).subscribe(
      response => {
        this.universeList = response;
        this.universeList.forEach(u => {
          u["status"] = "In Progress";
          u["selected"] = false;
        });
        this.setPageInfo();
        this.switchPage(1);
        this.dashboardService.setPlatform(this.selectedPlatform);
        this.universesAccordian = true;
        $("#UniverseAuthentication").modal("hide");
        this.alertService.info("BO server Login successful.");
      },
      error => this.alertService.error("BO Server login failed!")
    );
  }

  onAuthChange(value) {
    console.log(value);
  }
}
