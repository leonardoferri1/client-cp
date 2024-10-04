import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(readonly route: ActivatedRoute, readonly router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const authorization_token = params.get('authorization_token')
      const infrastructure_token = params.get('infrastructure_token')

      if (!authorization_token || authorization_token === '') {
        const hasToken = localStorage.getItem('token');
        if (hasToken && hasToken != 'undefined') {
          this.router.navigate(['/'], { replaceUrl: true });
          return;
        }
        const apiUrl = environment().apiUrl as string;
        if (apiUrl.includes('hom'))
          window.location.href = 'https://hom.siafic.ms.gov.br/login';
        if (apiUrl.includes('dev'))
          window.location.href = 'https://dev.siafic.ms.gov.br/login';
      }
      localStorage.setItem('authorization_token', authorization_token || '');
      localStorage.setItem('infrastructure_token', infrastructure_token || '');
    });
    this.router.navigate(['/lista-consorcios']);
  }
}
