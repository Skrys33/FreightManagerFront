import { Component } from '@angular/core';
import {FreightManagerAPIService} from "../../services/freight-manager-api/freight-manager-api.service";
import {Movement, MovementType} from "../../models/Movement";
import {DatePipe} from "@angular/common";
import {AlertService} from "../../services/alert-service/alert-service.service";
import {ActivatedRoute} from "@angular/router";
import {Warehouse} from "../../models/Warehouse";

@Component({
  selector: 'app-declare-movement',
  templateUrl: './declare-movement.component.html',
  styleUrls: ['./declare-movement.component.css']
})
export class DeclareMovementComponent {
  constructor(private freightManagerAPIService: FreightManagerAPIService, private datePipe: DatePipe, public alertService: AlertService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.setupComponent(params['type']);
    })
  }
  setupComponent(type: string) {
    this.movement = new Movement();
    this.movement.typeMovement = type;

    switch (this.movement.typeMovement){
      case MovementType.In:
        this.title = "Entrée";
        this.warehouseDirection = "Magasin d'origine";
        break;
      case MovementType.Out:
        this.title = "Sortie";
        this.warehouseDirection = "Magasin destination";
        break;
    }
  }
  movement: Movement = new Movement();
  movementDate: Date | undefined;
  title: string = "";
  warehouseDirection: string = "";
  warehouseDestination: Warehouse = new Warehouse();

  onSubmit(){

    this.movement.creationUser = "LoggedUser";
    this.movement.location = "RapidCargo CDG";


    switch (this.movement.typeMovement){
      case MovementType.In:
        this.movement.typeMovement = MovementType.In;
        this.movement.toWarehouse.label = "RapidCargo CDG";
        this.movement.toWarehouse.code = "CDGRC1";
        this.movement.fromWarehouse = this.warehouseDestination;
        break;
      case MovementType.Out:
        this.movement.typeMovement = MovementType.Out;
        this.movement.toWarehouse = this.warehouseDestination;
        this.movement.fromWarehouse.label = "RapidCargo CDG";
        this.movement.fromWarehouse.code = "CDGRC1";
        break;
    }

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
        },
        (error) => {
          this.alertService.showError('Une erreur est survenue : ' + error.message);
        });
  }
}
