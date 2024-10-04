import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  private queuedRequests = 0;

  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.queuedRequests++;
    this.spinnerService.setSpinnerState(true);

    const authorization_token = localStorage.getItem('authorization_token');
    const infrastructure_token = localStorage.getItem('infrastructure_token');
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authorization_token}`,
        Infrastructure: `Bearer ${infrastructure_token}`,
      },
    });

    return next.handle(authRequest).pipe(
      finalize(() => {
        this.queuedRequests--;
        if (this.queuedRequests == 0) {
          this.spinnerService.setSpinnerState(false);
        }
      })
    );
  }
}
