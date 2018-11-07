import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderStatus$: Subject<boolean> = new Subject();

  changeStatus(status: boolean) {
    this.loaderStatus$.next(status);
  }

}
