import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();
  private apiUrl = environment().apiUrl;
  private endpointsToCache = new Set([
    '/parametros/tabelanome',
    '/parametros/Periodicidade',
  ]);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const replace = request.url.replace(this.apiUrl, '');
    if (this.endpointsToCache.has(replace)) {
      const cacheResponse = this.cache.get(replace);

      if (cacheResponse) {
        return of(cacheResponse);
      }

      return next.handle(request).pipe(
        tap((response) => {
          if (response instanceof HttpResponse) {
            this.cache.set(request.url, response);
          }
        })
      );
    }

    return next.handle(request);
  }
}
