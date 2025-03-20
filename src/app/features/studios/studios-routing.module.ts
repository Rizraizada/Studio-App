import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioListComponent } from './studio-list/studio-list.component';
import { StudioDetailComponent } from './studio-detail/studio-detail.component';
import { StudioSearchComponent } from './studio-search/studio-search.component';

const routes: Routes = [
  { path: '', component: StudioListComponent }, // Default route for studios
  { path: 'search', component: StudioSearchComponent },
  { path: ':id', component: StudioDetailComponent } // Dynamic route for studio details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudiosRoutingModule { }
