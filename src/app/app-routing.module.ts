// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioListComponent } from './features/studios/studio-list/studio-list.component';
import { BookingListComponent } from './features/bookings/booking-list/booking-list.component';

const routes: Routes = [
  {
    path: '',
    // component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'studios', pathMatch: 'full' },
      { path: 'studios', component: StudioListComponent },
      { path: 'bookings', component: BookingListComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
