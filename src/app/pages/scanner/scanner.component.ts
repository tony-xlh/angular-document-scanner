import { Component, OnInit } from '@angular/core';
import Dynamsoft from "dwt";
import { WebTwain } from 'dwt/dist/types/WebTwain';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  public count:number;
  public containerID = "dwtcontrolContainer";
  public DWObject:WebTwain|undefined;
  constructor() { 
    this.count = 0
    this.initDWT();
  }

  ngOnInit(): void {
  }

  initDWT(){
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
      this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerID);
    });
    Dynamsoft.DWT.ResourcesPath = "/dwt-resources";
    Dynamsoft.DWT.Containers = [{
        WebTwainId: 'dwtObject',
        ContainerId: this.containerID
    }];

    Dynamsoft.DWT.Load();
  }

  onClick(){
    this.count++;
    this.DWObject?.AcquireImage();
  }
}
