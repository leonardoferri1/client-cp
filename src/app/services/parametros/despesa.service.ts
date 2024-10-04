import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import type { Despesa } from '../../models/despesa'

@Injectable({ providedIn: 'root' })
export class ParametrosDespesaService {
  constructor(readonly httpClient: HttpClient) {}

  mockGetParametrosDespesa(): Observable<Array<Despesa>> {
    return of([
      {
        tipoDespesa: 'Receitas Correntes',
        spfCodigo: '',
        indexador: 1,
      },
      {
        tipoDespesa: 'Impostos Taxas contribuições de melhorias',
        spfCodigo: '',
        indexador: 2,
      },
      {
        tipoDespesa: 'Contribuições',
        spfCodigo: '',
        indexador: 3,
      },
      {
        tipoDespesa: 'Patrimonial',
        spfCodigo: '',
        indexador: 4,
      },
      {
        tipoDespesa: 'Agropecuária',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Industrial',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Receita Serviços',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Transferências Correntes',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Outras receitas Correntes',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Receitas de Capital',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Operações de Crédito',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Alienação de Bens',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Amortização de Empréstimos',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Transferências de Capital',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Outras transferências de Capital',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Recceitas Correntes Intraorçamentárias',
        spfCodigo: '',
        indexador: 5,
      },
      {
        tipoDespesa: 'Receita de Contribuições Intraorçamentárias',
        spfCodigo: '',
        indexador: 5,
      },
    ])
  }
}
