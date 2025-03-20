import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';  // Import SharedModule
import { StudiosModule } from './features/studios/studios.module'; // Import feature module

@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule,    // This makes header, footer, and main layout available
    StudiosModule    // This makes StudioListComponent available
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
