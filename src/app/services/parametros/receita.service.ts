import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import type { Receita } from '../../models/receita'

@Injectable({ providedIn: 'root' })
export class ParametrosReceitaService {
  constructor(readonly httpClient: HttpClient) {}

  getParametrosReceita() {
    return this.httpClient.get<Array<Receita>>(
      `${import.meta.env.NG_APP_API_URL}/IndexadorReceita/Categorias`,
    )
  }

  putParametros(receita: ReceitaInput) {
    return this.httpClient.post(
      `${import.meta.env.NG_APP_API_URL}/IndexadorReceita`,
      receita,
    )
  }
}

export type ReceitaInput = {
  tipoReceita: string
  spfCodigo: string
  indexador: number
  valor: number
  valorPlanejado: number
}
