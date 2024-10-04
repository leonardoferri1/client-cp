import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ListaConsorciosPublicosService } from './lista-consorcios-publicos.service';

@Injectable({
  providedIn: 'root',
})
export class ConsorcioResolverService implements Resolve<any> {
  constructor(private listaConsorcioService: ListaConsorciosPublicosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const consorcioId = route.paramMap.get('id');
    return this.listaConsorcioService.getConsorcioId(consorcioId);
  }
}
