import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Dynamsoft from "dwt";
import { WebTwain } from 'dwt/dist/types/WebTwain';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit {
  @ViewChild('viewerElement') viewerElement:any;
  containerID = "dwtcontrolContainer";
  DWObject:WebTwain|undefined;
  private _width:string;
  @Input()
  set width(width: string) {
    this._width= width;
  }

  get width(): string{ return this._width; }

  private _height:string;
  @Input()
  set height(height: string) {
    this._height= height;
  }

  get height(): string{ return this._height; }


  constructor() { 
    this._width = "100%";
    this._height = "100%";
    this.initDWT();
  }

  ngOnInit(): void {

  }

  initDWT(){
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
      this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerID);
      this.DWObject.Viewer.width = this._width;
      this.DWObject.Viewer.height = this._height;
      console.log(this.viewerElement);
      this.viewerElement.nativeElement.style.width = this._width;
      this.viewerElement.nativeElement.style.height = this._height;
      
    });
    Dynamsoft.DWT.ProductKey = "t01529gIAACXEXNlM7wE1256QvZ+rCxocWpLMMCDZjZERU2jIoIbVgsAOjGxkCTEHve0cFnCRhwnMbKfvzroxV8eij1g0DudsWGIjGBhUE+VdqW3JGXmBzYB2AF/kCKzLD7jr53VUwQGJgAbApvEHnIf8zkoGIT2QCGgAzkM6MJhk+2lIDwX3HpJDIBHQAPSQDqw3Ya2VT+1Tmkg=";
    Dynamsoft.DWT.ResourcesPath = "assets/dwt-resources";
    Dynamsoft.DWT.Containers = [{
        WebTwainId: 'dwtObject',
        ContainerId: this.containerID
    }];

    Dynamsoft.DWT.Load();
  }

}
