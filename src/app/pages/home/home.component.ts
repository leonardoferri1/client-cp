import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { UserService } from '../../services/user/user.service'

@Component({
  standalone: true,
  template: `
    <div class="flex flex-col gap-12 items-center justify-center h-[50vh]">
      <div class="flex flex-row justify-center">
        <h3 class="text-2xl font-semibold">Bem vindo ao Sistema</h3>
      </div>

      <div class="flex flex-row justify-center">
        <h1 class="text-4xl font-bold text-brand">Créditos a Receber</h1>
      </div>

      <div class="flex flex-row justify-center">
        <h3 class="text-3xl text-zinc-400">
          Para navegar use a barra de navegação no topo da página
        </h3>
      </div>
    </div>
  `,
})
export class HomeComponent {
  userService = inject(UserService)
}
