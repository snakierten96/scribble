import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImagesComponent } from './images.component';
//import { ImagesResolveService } from './images-resolve.service';

const routes: Routes = [
  { 
    path: '', 
    component: ImagesComponent,
    /*
    resolve: {
      images: ImagesResolveService
    }
    */
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ImagesRouingModule { }