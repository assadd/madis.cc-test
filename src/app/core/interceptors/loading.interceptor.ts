import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadService } from '../services/load.service';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private ongoingRequests = 0;

  constructor(private loadService: LoadService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.ongoingRequests === 0) {
      this.loadService.show();
    }
    this.ongoingRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.ongoingRequests--;
        if (this.ongoingRequests === 0) {
          this.loadService.hide();
        }
      })
    );
  }
}