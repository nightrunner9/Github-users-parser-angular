import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { BioComponent } from './components/bio/bio.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: ':id',
    component: BioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
