import { NgModule } from '@angular/core';

import { ScannerRoutingModule } from './scanner-routing.module';

import { ScannerComponent } from './scanner.component';


@NgModule({
  imports: [ScannerRoutingModule],
  declarations: [ScannerComponent],
  exports: [ScannerComponent]
})
export class ScannerModule { }
