import { Component } from '@angular/core';
import {FreightManagerAPIService} from "../../services/freight-manager-api/freight-manager-api.service";
import {Movement, MovementType} from "../../models/Movement";

@Component({
  selector: 'app-movement-history',
  templateUrl: './movement-history.component.html',
  styleUrls: ['./movement-history.component.css'],
  host : {
    '[style.flex]' : "1",
    '[style.display]' : "'contents'"
  }
})
export class MovementHistoryComponent {
  constructor(private freightManagerAPIService: FreightManagerAPIService) {
    this.loadLatestMovements();
  }

  movements: Movement[] = [];
  formatMovementDateTime(dateTime: string | undefined): string | undefined {
    let dateFormatted: string = "";
    if (dateTime) {

      dateFormatted =dateTime.replace("T", " ").split(".")[0];
    }
    return dateFormatted;
  }

  formatTypeMovement(movementType: string | undefined): string | undefined {
    let movementTypeFormatted = "";

    switch (movementType){
      case MovementType.In:
        movementTypeFormatted = "ENTREE";
        break
      case MovementType.Out:
        movementTypeFormatted = "SORTIE";
        break
    }
    return movementTypeFormatted;
  }

  loadLatestMovements() {
    this.freightManagerAPIService.getLatestMovements(50).subscribe(movements => {
      this.movements = movements;
    });
  }
}
