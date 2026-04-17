import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TicketDashboardComponent } from './components/ticket-dashboard/ticket-dashboard.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketSearchComponent } from './components/ticket-search/ticket-search.component';
import { TicketFooterComponent } from './components/ticket-footer/ticket-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketDashboardComponent,
    TicketFormComponent,
    TicketSearchComponent,
    TicketFooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
