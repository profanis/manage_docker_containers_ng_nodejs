import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
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

    const handle200 = function(status) {
      if (status === 200) {
        console.log('Successfully saved!');
        // TODO: enagle toastr
        // this.toastr.success('Successfully saved!', 'info');
      }
    };


    if (event instanceof HttpResponse) {

      handle200(event.status);

      this.handleLoading().hide();
    }

    return event;
  }

  private handleErrorResponse = (err) => {
    let message = '';
    try {
      message = err.error.messages;
    } catch (e) {
      // do nothing
    }
    if (message) {
      // this.toastr.error(message, 'error');
      // TODO: enable toastr
      console.error(message);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.handleLoading().show();

    return next.handle(req).pipe(

      map(this.handleResponse),

      catchError((err: any, caught: Observable<any>) => {

        this.handleErrorResponse(err);

        this.handleLoading().hide();
        return observableThrowError(err);
      }));
  }
}
