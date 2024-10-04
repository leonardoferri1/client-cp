import { Component, inject, OnInit } from '@angular/core'
import {
  ParametrosReceitaService,
  ReceitaInput,
} from '../../../services/parametros/receita.service'
import { CardParameterComponent } from '../../../shared/components/card-parameter/card-parameter.component'
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import type { Receita } from '../../../models/receita'
import { MessageService } from 'primeng/api'

@Component({
  standalone: true,
  templateUrl: './receitas.component.html',
  imports: [CardParameterComponent, AsyncPipe, ButtonModule, JsonPipe, NgIf],
})
export class ReceitasComponent implements OnInit {
  receitasService = inject(ParametrosReceitaService)
  messageService = inject(MessageService)
  parametrosReceita: Receita[] = []
  isSaving = false
  isLoading = false

  ngOnInit(): void {
    this.isLoading = true
    this.receitasService.getParametrosReceita().subscribe((data) => {
      this.parametrosReceita = data
      this.isLoading = false
    })
  }

  onCancel() {}
  onSave() {
    this.isSaving = true
    this.parametrosReceita.map((p) => {
      if (p.indexador) {
        const payload: ReceitaInput = {
          spfCodigo: p.categoriaEconomicaReceitaCodigo,
          indexador: p.indexador,
          valor: 0,
          valorPlanejado: 0,
          tipoReceita: p.categoriaReceitaNome,
        }

        this.receitasService.putParametros(payload).subscribe({
          error: (error) => {
            this.isSaving = false
          },
          complete: () => {
            this.isSaving = false

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Receita ${p.categoriaReceitaNome} salvo com sucesso!`,
            })
          },
        })
      }
    })
  }
}
