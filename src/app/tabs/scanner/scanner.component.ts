import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  public count:number;
  
  constructor() { 
    this.count = 0
  }

  ngOnInit(): void {
  }

  onClick(){
    this.count++;
  }
}
