import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { SidebarModule } from 'primeng/sidebar'

@Component({
  selector: 'app-filtro-execucao-orcamentaria',
  standalone: true,
  imports: [SidebarModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './filtro-execucao-orcamentaria.component.html',
  styleUrl: './filtro-execucao-orcamentaria.component.scss',
})
export class FiltroExecucaoOrcamentariaComponent {
  @Input() isFiltroOpen!: boolean
  @Output() onFilterVisibilityChange = new EventEmitter<boolean>()
  @Output() onFilterApply = new EventEmitter()

  exerciciosAnuais = [
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
  ]

  tipos = [
    { label: 'Despesa', value: 'despesa' },
    { label: 'Receita', value: 'receita' },
  ]

  form = new FormGroup({
    exercicio: new FormControl(null, Validators.required),
    tipo: new FormControl(null),
  })

  handleApplyFilter() {
    this.onFilterApply.emit(this.form.value)
  }
}
