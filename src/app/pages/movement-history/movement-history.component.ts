import { Component } from '@angular/core';
import {FreightManagerAPIService} from "../../services/freight-manager-api/freight-manager-api.service";
import {Movement} from "../../models/Movement";

@Component({
  selector: 'app-movement-history',
  templateUrl: './movement-history.component.html',
  styleUrls: ['./movement-history.component.css']
})
export class MovementHistoryComponent {
  constructor(private freightManagerAPIService: FreightManagerAPIService) {
    this.loadLatestMovements();
  }

  movements: Movement[] = [];

  loadLatestMovements() {
    this.freightManagerAPIService.getLatestMovements(50).subscribe(movements => {
      this.movements = movements;
      console.log(this.movements);
    });
  }
}
