import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  pendingRequest: number = 0;
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoading();
    this.pendingRequest += 1;
    return next.handle(request).pipe(
      tap({
        next: (event)=>{
          if(event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        error: (_) => {
          this.handleHideLoading();
        }
      })
    );
  }

  handleHideLoading() {
    this.pendingRequest -= 1;
    if(this.pendingRequest === 0) this.loaderService.hideLoading();
  }
}
