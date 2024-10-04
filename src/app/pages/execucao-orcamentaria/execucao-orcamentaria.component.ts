import { Component } from '@angular/core'
import { FiltroExecucaoOrcamentariaComponent } from './filtro-execucao-orcamentaria/filtro-execucao-orcamentaria.component'
import { OrcamentoMesComponent } from './orcamento-mes/orcamento-mes.component'
import { NgIf } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  standalone: true,
  templateUrl: 'execucao-orcamentaria.component.html',
  selector: 'app-execucao-orcamentaria',
  imports: [FiltroExecucaoOrcamentariaComponent, OrcamentoMesComponent, NgIf],
})
export class ExecucaoOrcamentariaComponent {
  isFiltroOpen = true

  constructor(private router: Router) {}

  meses = [
    {
      id: 1,
      nome: 'Janeiro',
      arrecadado: 1500,
      projetado: 800,
    },
    {
      id: 2,
      nome: 'Fevereiro',
      arrecadado: 1200,
      projetado: 900,
    },
    {
      id: 3,
      nome: 'Março',
      arrecadado: 1800,
      projetado: 1100,
    },
    {
      id: 4,
      nome: 'Abril',
      arrecadado: 1000,
      projetado: 700,
    },
    {
      id: 5,
      nome: 'Maio',
      arrecadado: 2200,
      projetado: 1300,
    },
    {
      id: 6,
      nome: 'Junho',
      arrecadado: 1500,
      projetado: 1000,
    },
    {
      id: 7,
      nome: 'Julho',
      arrecadado: 2000,
      projetado: 1200,
    },
    {
      id: 8,
      nome: 'Agosto',
      arrecadado: 2500,
      projetado: 1500,
    },
    {
      id: 9,
      nome: 'Setembro',
      arrecadado: 1800,
      projetado: 1300,
    },
    {
      id: 10,
      nome: 'Outubro',
      arrecadado: 1200,
      projetado: 900,
    },
    {
      id: 11,
      nome: 'Novembro',
      arrecadado: 1500,
      projetado: 1000,
    },
    {
      id: 12,
      nome: 'Dezembro',
      arrecadado: 2000,
      projetado: 1200,
    },
  ]

  onClickOrcamentoMes(mes: any) {
    this.router.navigate(['consultas/execucao-orcamentaria-mes'], {
      queryParams: {
        mes: mes.id,
        ano: 2025,
      },
    })
  }

  onFilterApply(event: any) {
    this.isFiltroOpen = false
  }

  openFilter() {
    this.isFiltroOpen = true
  }
}
