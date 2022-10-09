import { Component } from '@angular/core';
import { WebTwain } from 'dwt/dist/types/WebTwain';
import { DeviceConfiguration } from 'dwt/dist/types/WebTwain.Acquire';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  DWObject: WebTwain|undefined;
  selectedScanner: string = "";
  scanners: string[] = [];
  showUI:boolean = false;
  useADF:boolean = false;
  duplex:boolean = false;
  constructor(){

  }

  onWebTWAINReady(DWObject:WebTwain){
    this.DWObject = DWObject;
    console.log(this.DWObject);
    this.loadScanners();
  }

  loadScanners(){
    if (this.DWObject) {
      const names = this.DWObject.GetSourceNames(false) as string[];
      this.scanners = names;
      if (names.length>0) {
        this.selectedScanner = names[0];
      }
    }
    console.log(this.scanners);
  }

  scan(){
    console.log(this.selectedScanner);
    if (this.DWObject) {
      let deviceConfiguration:DeviceConfiguration = {};
      deviceConfiguration.IfShowUI = this.showUI;
      deviceConfiguration.IfFeederEnabled = this.useADF;
      deviceConfiguration.IfDuplexEnabled = this.duplex;
      deviceConfiguration.SelectSourceByIndex = this.scanners.indexOf(this.selectedScanner);
      console.log(deviceConfiguration);
      this.DWObject.AcquireImage(deviceConfiguration);
    }
  }

  save(){
    if (this.DWObject) {
      const onSuccess = () => {
        alert("Success");
      }
      const onFailure = () => {
        alert("Failed");
      }
      this.DWObject.SaveAllAsPDF("Documents.pdf",onSuccess,onFailure);
    }
  }

  edit() {
    if (this.DWObject) {
      let imageEditor = this.DWObject.Viewer.createImageEditor();
      imageEditor.show();
    }
  }

  removeSelected(){
    if (this.DWObject) {
      this.DWObject.RemoveAllSelectedImages();
    }
  }

  rotateRight(){
    if (this.DWObject) {
      this.DWObject.RotateRight(this.DWObject.CurrentImageIndexInBuffer);
    }
  }
}
