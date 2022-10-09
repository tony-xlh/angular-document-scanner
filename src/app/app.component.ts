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
      deviceConfiguration.IfShowUI = false;
      deviceConfiguration.IfFeederEnabled = false;
      deviceConfiguration.SelectSourceByIndex = this.scanners.indexOf(this.selectedScanner);
      console.log(deviceConfiguration);
      this.DWObject.AcquireImage(deviceConfiguration);
    }
  }
}
