import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { StudioListComponent } from './features/studios/studio-list/studio-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'studios', pathMatch: 'full' },
      { path: 'studios', component: StudioListComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  // This makes <router-outlet> available to AppModule
})
export class AppRoutingModule {}
