import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'lista-consorcios',
    loadChildren: () =>
      import(
        './pages/lista-consorcios-publicos/lista-consorcios-publicos.module'
      ).then((m) => m.ListaConsorciosPublicosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
