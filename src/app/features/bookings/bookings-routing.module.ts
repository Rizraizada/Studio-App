// src/app/features/bookings/bookings-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';

const routes: Routes = [
  { path: '', component: BookingListComponent },
  { path: 'details/:id', component: BookingDetailComponent },
  { path: 'create', component: CreateBookingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
