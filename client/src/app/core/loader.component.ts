import { Component } from '@angular/core';

import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  template: `
  <div *ngIf="showLoading$ | async" class="loading">
    <img src="assets/loader.gif"/>
  </div>
  `,
  styles: [
    `
    .loading {
      transition: opacity .8s ease-in-out;
      position: fixed;
      height: 100%;
      width: 100%;
      top: 50%;
      left: 50%;
      z-index: 500;
    }
    `
  ]
})
export class LoaderComponent {
  showLoading$ = this.loaderService.loaderStatus$;
  constructor(private loaderService: LoaderService) { }
}
