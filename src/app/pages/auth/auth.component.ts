import { Component, inject, type OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PortalService } from '../../services/portal/portal.service'
import { UserService } from '../../services/user/user.service'

@Component({
  template: '',
  standalone: true,
})
export class AuthComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  portalService = inject(PortalService)
  userService = inject(UserService)

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((data) => {
      const infrastructure_token = data.get('infrastructure_token')
      const authorization = data.get('authorization_token')

      if (infrastructure_token && authorization) {
        localStorage.setItem(
          '@siafic:infrastructure_token',
          infrastructure_token,
        )
        localStorage.setItem('@siafic:authorization_token', authorization)

        // this.portalService.getUsuarioById(authorization).subscribe((value) => {
        //   this.userService.saveUser(value)
        //   this.router.navigate(['/'])
        // })

        this.router.navigate(['/'])
      }
    })
  }
}
