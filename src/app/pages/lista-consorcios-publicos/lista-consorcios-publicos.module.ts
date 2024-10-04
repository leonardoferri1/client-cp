import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaConsorciosPublicosComponent } from './lista-consorcios-publicos.component';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NovoConsorcioComponent } from './novo-consorcio/novo-consorcio.component';
import { ConsorcioComponent } from './components/consorcio/consorcio.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastModule } from 'primeng/toast';
import { VisualizarConsorcioComponent } from './visualizar-consorcio/visualizar-consorcio.component';
import { EditarConsorcioComponent } from './editar-consorcio/editar-consorcio.component';
import { ConsorcioResolverService } from './services/consorcio-resolver.service';

@NgModule({
  imports: [
    // primeng
    DropdownModule,
    MultiSelectModule,
    TableModule,
    SidebarModule,
    FontAwesomeModule,
    CalendarModule,
    AutoCompleteModule,
    DialogModule,
    InputNumberModule,
    CurrencyMaskModule,
    ToastModule,
    // primeng

    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListaConsorciosPublicosComponent,
      },
      {
        path: 'novo',
        component: NovoConsorcioComponent,
      },
      {
        path: 'editar/:id',
        component: EditarConsorcioComponent,
        resolve: {
          consorcioEditData: ConsorcioResolverService,
        },
      },
      {
        path: 'visualizar/:id',
        component: VisualizarConsorcioComponent,
      },
    ]),
  ],
  declarations: [
    ListaConsorciosPublicosComponent,
    NovoConsorcioComponent,
    EditarConsorcioComponent,
    VisualizarConsorcioComponent,
    ConsorcioComponent,
  ],
})
export class ListaConsorciosPublicosModule {}
