import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioListComponent } from './studio-list/studio-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    StudioListComponent  // Use selector: 'app-studio-list'
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StudioListComponent
  ]
})
export class StudiosModule {}
