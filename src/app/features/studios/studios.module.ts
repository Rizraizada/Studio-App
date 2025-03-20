import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudiosRoutingModule } from './studios-routing.module';
import { StudioListComponent } from './studio-list/studio-list.component';
import { StudioDetailComponent } from './studio-detail/studio-detail.component';
import { StudioSearchComponent } from './studio-search/studio-search.component';


@NgModule({
  declarations: [
    StudioListComponent,
    StudioDetailComponent,
    StudioSearchComponent
  ],
  imports: [
    CommonModule,
    StudiosRoutingModule
  ]
})
export class StudiosModule { }
