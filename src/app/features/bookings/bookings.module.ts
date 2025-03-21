// src/app/features/bookings/bookings.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';

@NgModule({
  declarations: [
    BookingListComponent,
    BookingDetailComponent,
    CreateBookingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BookingsRoutingModule
  ],
  exports: [
    CreateBookingComponent,
    BookingListComponent
  ]
})
export class BookingsModule { }
