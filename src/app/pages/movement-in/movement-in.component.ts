import { Component } from '@angular/core';
import {FreightManagerAPIService} from "../../services/freight-manager-api/freight-manager-api.service";
import {Movement, MovementType} from "../../models/Movement";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-movement-in',
  templateUrl: './movement-in.component.html',
  styleUrls: ['./movement-in.component.css']
})
export class MovementInComponent {
  constructor(private freightManagerAPIService: FreightManagerAPIService, private datePipe: DatePipe) {
  }
  movement: Movement = new Movement();
  movementDate: Date | undefined;

  onSubmit(){

    this.movement.typeMovement = MovementType.In;
    this.movement.creationUser = "LoggedUser";
    this.movement.location = "RapidCargo CDG";
    this.movement.toWarehouse.label = "RapidCargo CDG";
    this.movement.toWarehouse.code = "CDGRC1";

    let movementTime: string | null = this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss');
    if (movementTime){
      this.movement.creationDateTime = movementTime;
    }

    if (this.movementDate) this.movement.movementDateTime = this.movementDate.toString();

    console.log(this.movement);
    this.freightManagerAPIService.addMovement(this.movement)
      .subscribe(
        response => {
          console.log('Réponse de l\'API :', response);
    });
  }
}
