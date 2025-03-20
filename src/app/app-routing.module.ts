import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'studios', pathMatch: 'full' }, // Redirect to studios by default
  { path: 'studios', loadChildren: () => import('./features/studios/studios.module').then(m => m.StudiosModule) },
  { path: 'bookings', loadChildren: () => import('./features/bookings/bookings.module').then(m => m.BookingsModule) },
  { path: '**', redirectTo: 'studios' } // Wildcard route redirects to studios
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
