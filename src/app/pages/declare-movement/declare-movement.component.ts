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

    this.warehouseDestination = new Warehouse()
    this.warehouseDirection = "";
    this.movementDate = undefined;

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
  clear() {
    if (this.movement.typeMovement){
      this.setupComponent(this.movement.typeMovement);
    }
  }

  alertClasses = "alert alert-warning alert-dismissible fade show"
  movement: Movement = new Movement();
  movementDate: Date | undefined;
  title: string = "";
  warehouseDirection: string = "";
  warehouseDestination: Warehouse  = new Warehouse();

  isValidMovement(movement: Movement): boolean{
    let messageAlert = "";

    if(movement.customsStatus == "") messageAlert ="Status douanier non renseigné";
    if(movement.movementDateTime == undefined) messageAlert ="Date du mouvement non renseignée";

    if(movement.goods.reference == "") messageAlert ="Reference de la marchandise non renseignée";
    if(movement.goods.referenceType == "") messageAlert ="Type de la reference non renseigné";

    if(movement.typeMovement == MovementType.In && movement.fromWarehouse.label == "") messageAlert ="Nom du magasin d'origine non renseigné";
    if(movement.typeMovement == MovementType.In && movement.fromWarehouse.code == "") messageAlert ="Code du magasin d'origine non renseigné";
    if(movement.typeMovement == MovementType.Out && movement.toWarehouse.label == "") messageAlert ="Nom du magasin de destination non renseigné";
    if(movement.typeMovement == MovementType.Out && movement.toWarehouse.code == "") messageAlert ="Code du magasin de destination non renseigné";

    if(movement.typeMovement == MovementType.Out && movement.typeAuthorization == "") messageAlert ="Type d'autorisation non renseigné";
    if(movement.typeMovement == MovementType.Out && movement.referenceAuthorization == "") messageAlert ="Reference d'autorisation non renseignée";

    if(messageAlert != "") {
      this.alertClasses = "alert alert-warning alert-dismissible fade show";
      this.alertService.showAlert('Mouvement imcomplet : ' + messageAlert);
    }

    return messageAlert == "";
  }
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

    if (this.isValidMovement(this.movement)){
      this.freightManagerAPIService.addMovement(this.movement)
        .subscribe(
          response => {
            this.alertClasses = "alert alert-success alert-dismissible fade show";
            this.alertService.showAlert('Mouvement déclaré !');

            this.clear();
          },
          (error) => {
            let errorMessage: string = typeof error.error === 'object' ? "Imcomplete Movement" : error.error;
            this.alertClasses = "alert alert-warning alert-dismissible fade show";
            this.alertService.showAlert('Une erreur est survenue : ' + errorMessage);
          });
    }

  }
}
