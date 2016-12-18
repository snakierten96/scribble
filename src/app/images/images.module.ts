import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { ImagesRouingModule } from './images-routing.module';

import { FaderDirective } from '../fader.directive';

@NgModule({
  imports: [
    CommonModule,
    ImagesRouingModule
  ],
  declarations: [
    ImagesComponent,
    FaderDirective
  ]
})
export class ImagesModule { }
