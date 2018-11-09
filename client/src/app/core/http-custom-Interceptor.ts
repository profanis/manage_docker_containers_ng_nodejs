import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoaderService } from './loader.service';



@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService,
              private loaderService: LoaderService) { }

  private handleLoading = function() {
    return {
      show: () => {
        this.loaderService.changeStatus(true);
      },
      hide: () => {
        this.loaderService.changeStatus(false);
      }
    };
  };

  private handleResponse = (event: HttpEvent<any>) => {

    const handle201 = (status) => {
      if (status === 201) {
        this.toastr.success('Successfully saved!', 'info');
      }
    };

    const handle203 = (status) => {
      if (status === 203) {
        this.toastr.success('Successfully deleted!', 'info');
      }
    };


    if (event instanceof HttpResponse) {

      handle201(event.status);

      handle203(event.status);

      this.handleLoading().hide();
    }

    return event;
  }

  private handleErrorResponse = (err) => {
    debugger;
    let message = '';
    try {
      message = err.message;
    } catch (e) {
      // do nothing
    }
    if (message) {
      this.toastr.error(message, 'error');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.handleLoading().show();

    return next.handle(req).pipe(

      map(this.handleResponse),

      catchError((err: any, caught: Observable<any>) => {

        this.handleErrorResponse(err.error);

        this.handleLoading().hide();
        return observableThrowError(err);
      }));
  }
}
