import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { OverlayComponent } from './components/overlay/overlay.component';

const childRoutes: Routes = [
  {
    path: ':id',
    component: OverlayComponent,
  }
]

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
