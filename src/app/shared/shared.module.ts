import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { StudioCardComponent } from './components/studio-card/studio-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FilterByAreaPipe } from './pipes/filter-by-area.pipe';



@NgModule({
  declarations: [
    StarRatingComponent,
    StudioCardComponent,
    SearchBarComponent,
    BookingFormComponent,
    ConfirmationDialogComponent,
    ClickOutsideDirective,
    FilterByAreaPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
