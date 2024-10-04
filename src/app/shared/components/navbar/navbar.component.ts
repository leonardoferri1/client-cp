import { Component, inject } from '@angular/core'
import { MegaMenuItem } from 'primeng/api'
import { MenubarModule } from 'primeng/menubar'
import { UserService } from '../../../services/user/user.service'
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common'
import { MegaMenuModule } from 'primeng/megamenu'
import { ButtonModule } from 'primeng/button'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    MenubarModule,
    MegaMenuModule,
    JsonPipe,
    AsyncPipe,
    ButtonModule,
    NgClass,
  ],
  providers: [UserService],
})
export class NavbarComponent {
  userService = inject(UserService)
  menuItems: MegaMenuItem[] | undefined

  constructor(readonly router: Router) {
    this.menuItems = [
      {
        label: 'Paramêtros',
        items: [
          [
            {
              items: [
                {
                  label: 'Receitas',
                  command: () => router.navigate(['parametros/receitas']),
                },
              ],
            },
          ],
          [
            {
              items: [
                {
                  label: 'Despesas',
                  command: () => router.navigate(['parametros/despesas']),
                },
              ],
            },
          ],
        ],
      },
      {
        label: 'Consultas',
        items: [
          [
            {
              items: [
                {
                  label: 'Execução Orçamentária',
                  command: () =>
                    router.navigate(['consultas/execucao-orcamentaria']),
                },
              ],
            },
          ],
        ],
      },
    ]
  }
}
