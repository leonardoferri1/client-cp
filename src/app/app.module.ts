import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MessageService } from 'primeng/api';
import { CoreInterceptor } from './interceptor/auth.interceptor';
import { ApiCacheInterceptor } from './interceptor/api-cache-interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

registerLocaleData(ptBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    TieredMenuModule,
    TableModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AutoCompleteModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: CoreInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiCacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
