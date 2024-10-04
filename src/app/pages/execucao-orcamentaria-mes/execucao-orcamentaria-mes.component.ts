import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrcamentoDiaComponent } from '../execucao-orcamentaria/orcamento-dia/orcamento-dia.component'
import { add, startOfWeek } from 'date-fns'

@Component({
  selector: 'app-execucao-orcamentaria-mes',
  templateUrl: './execucao-orcamentaria-mes.component.html',
  standalone: true,
  imports: [OrcamentoDiaComponent],
})
export class ExecucaoOrcamentariaMes implements OnInit {
  mes!: number
  ano!: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.ano = Number(params.get('ano'))
      this.mes = Number(params.get('mes'))
    })
  }

  buildDaysOfMonth() {
    const firstDayOfMonth = new Date(this.ano, this.mes - 1)
    const daysInMonth = new Date(this.ano, this.mes, 0).getDate()
    const days = []
    const firstDayOfMonthWeek = new Date(firstDayOfMonth).getDay()

    console.log({ daysInMonth, firstDayOfMonth, firstDayOfMonthWeek })

    for (let i = 1; i <= firstDayOfMonthWeek; i++) {
      days.push({
        dia: null,
        arrecadado: 0,
        projetado: 0,
      })
    }

    for (let i = 1; i < daysInMonth + 1; i++) {
      days.push({
        dia: i,
        arrecadado: 1500,
        projetado: 1000,
      })
    }
    return days
  }

  getDayweek(data: string) {
    const diasDaSemana = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ]

    const dataObj = new Date(data)
    const diaDaSemana = diasDaSemana[dataObj.getDay()]
    return diaDaSemana
  }

  buildDaysOfWeek() {
    return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  }

  get monthName() {
    return new Date(this.ano, this.mes - 1, 1).toLocaleString('pt-BR', {
      month: 'long',
    })
  }

  onClickOrcamentoDia(dia: any) {}

  addMonth() {
    const newDate = add(new Date(this.ano, this.mes, 0), { months: 1 })
    this.ano = newDate.getFullYear()
    this.mes = newDate.getMonth() + 1
    this.updateRoute()
  }
  subMonth() {
    const newDate = add(new Date(this.ano, this.mes - 2, 0), { months: 1 })
    this.ano = newDate.getFullYear()
    this.mes = newDate.getMonth() + 1
    this.updateRoute()
  }

  updateRoute() {
    this.router.navigate(['consultas/execucao-orcamentaria-mes'], {
      queryParams: {
        ano: this.ano,
        mes: this.mes,
      },
    })
  }
}
