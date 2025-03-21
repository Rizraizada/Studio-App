import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { StudioListComponent } from './features/studios/studio-list/studio-list.component';
import { BookingListComponent } from './features/bookings/booking-list/booking-list.component';  // Import the new component

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'studios', pathMatch: 'full' },
      { path: 'studios', component: StudioListComponent },
      { path: 'bookings', component: BookingListComponent }  // New route for booking list
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
