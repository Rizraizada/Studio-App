import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';

const routes: Routes = [
  { path: '', component: BookingListComponent }, // Default route for bookings
  { path: 'new', component: CreateBookingComponent }, // Route for creating a booking
  { path: ':id', component: BookingDetailComponent } // Dynamic route for booking details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
