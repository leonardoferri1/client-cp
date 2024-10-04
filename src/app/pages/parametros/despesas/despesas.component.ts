import { Component, inject, OnInit } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { CardParameterComponent } from '../../../shared/components/card-parameter/card-parameter.component'
import { ParametrosDespesaService } from '../../../services/parametros/despesa.service'
import type { Despesa } from '../../../models/despesa'

@Component({
  templateUrl: './despesas.component.html',
  standalone: true,
  imports: [AsyncPipe, CardParameterComponent],
})
export class DespesasComponent implements OnInit {
  despesaService = inject(ParametrosDespesaService)
  despesas: Despesa[] = []

  ngOnInit(): void {
    this.despesaService.mockGetParametrosDespesa().subscribe((data) => {
      this.despesas = data
    })
  }

  onCancel() {}
  onSave() {}
}
