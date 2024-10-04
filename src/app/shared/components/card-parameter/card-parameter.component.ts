import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
@Component({
  selector: 'app-card-parameter',
  templateUrl: './card-parameter.component.html',
  standalone: true,
  imports: [FormsModule, InputTextModule],
})
export class CardParameterComponent {
  @Input() titulo!: string
  @Input() valor!: number

  @Output() valorChange = new EventEmitter<number>()
}
