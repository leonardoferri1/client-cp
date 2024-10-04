import { CurrencyPipe, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-orcamento-dia',
  standalone: true,
  imports: [NgIf, CurrencyPipe],
  templateUrl: './orcamento-dia.component.html',
})
export class OrcamentoDiaComponent {
  @Input() orcamento!: any
}
