import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioListComponent } from './studio-list/studio-list.component';
import { SharedModule } from '../../shared/shared.module';
import { BookingsModule } from '../bookings/bookings.module';

@NgModule({
  declarations: [
    StudioListComponent  // Use selector: 'app-studio-list'
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookingsModule
  ],
  exports: [
    StudioListComponent
  ]
})
export class StudiosModule {}
