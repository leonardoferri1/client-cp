import type { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { AuthComponent } from './pages/auth/auth.component'
import { ReceitasComponent } from './pages/parametros/receitas/receitas.component'
import { DespesasComponent } from './pages/parametros/despesas/despesas.component'
import { ExecucaoOrcamentariaComponent } from './pages/execucao-orcamentaria/execucao-orcamentaria.component'
import { ExecucaoOrcamentariaMes } from './pages/execucao-orcamentaria-mes/execucao-orcamentaria-mes.component'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => HomeComponent,
  },
  {
    path: 'auth',
    loadComponent: () => AuthComponent,
  },
  {
    path: 'parametros/receitas',
    loadComponent: () => ReceitasComponent,
  },
  {
    path: 'parametros/despesas',
    loadComponent: () => DespesasComponent,
  },
  {
    path: 'consultas/execucao-orcamentaria',
    loadComponent: () => ExecucaoOrcamentariaComponent,
  },
  {
    path: 'consultas/execucao-orcamentaria-mes',
    loadComponent: () => ExecucaoOrcamentariaMes,
  },
]
