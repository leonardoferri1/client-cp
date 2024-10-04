import { JsonPipe } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-orcamento-mes',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './orcamento-mes.component.html',
  styleUrl: './orcamento-mes.component.scss',
})
export class OrcamentoMesComponent {
  @Input() orcamento!: any

  @Output() click = new EventEmitter<any>()
}
