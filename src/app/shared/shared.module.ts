import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudiosCardComponent } from './components/studio-card/studio-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

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
    FormsModule
  ],
  exports: [
    StudiosCardComponent,
    SearchBarComponent,
    StarRatingComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    FormsModule
  ]
})
export class SharedModule { }
