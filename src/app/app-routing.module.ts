import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovementHistoryComponent} from "./pages/movement-history/movement-history.component";
import {DeclareMovementComponent} from "./pages/declare-movement/declare-movement.component";

export const appRouteList: Routes = [
  {
    path: 'history',
    component: MovementHistoryComponent
  },
  {
    path: 'declareMovement/:type',
    component: DeclareMovementComponent
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
