// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule here

import { StudiosCardComponent } from './components/studio-card/studio-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { BookingsModule } from '../features/bookings/bookings.module';

@NgModule({
  declarations: [
    StudiosCardComponent,
    SearchBarComponent,
    StarRatingComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule // Add RouterModule here
  ],
  exports: [
    StudiosCardComponent,
    SearchBarComponent,
    StarRatingComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    BookingsModule,
    FormsModule
  ]
})
export class SharedModule { }
