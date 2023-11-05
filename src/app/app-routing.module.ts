import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovementHistoryComponent} from "./pages/movement-history/movement-history.component";

export const appRouteList: Routes = [
  {
    path: 'history',
    component: MovementHistoryComponent
  },
  {
    path: '**',
    redirectTo: 'history'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouteList) // CommonModule
  ]
})

export class AppRoutingModule { }
