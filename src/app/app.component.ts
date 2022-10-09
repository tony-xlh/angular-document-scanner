import { Component } from '@angular/core';
import { WebTwain } from 'dwt/dist/types/WebTwain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  DWObject: WebTwain|undefined;
  constructor(){

  }

  onWebTWAINReady(DWObject:WebTwain){
    this.DWObject = DWObject;
    console.log(this.DWObject);
  }
}
