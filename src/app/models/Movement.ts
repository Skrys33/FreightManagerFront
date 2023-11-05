import {Goods} from "./Goods";
import {Warehouse} from "./Warehouse";

export class Movement {
  id: string | undefined;
  creationDateTime: string | undefined;
  creationUser: string | undefined;
  movementDateTime: string | undefined;
  location: string | undefined;
  goods: Goods;
  customsStatus: string | undefined;
  referenceAuthorization: string | undefined;
  typeAuthorization: string | undefined;
  typeMovement: string | undefined;
  fromWarehouse: Warehouse;
  toWarehouse: Warehouse;
  constructor() {
    this.goods = new Goods();
    this.fromWarehouse = new Warehouse();
    this.toWarehouse = new Warehouse();
  }
}
export enum MovementType {
  In = "In",
  Out = "Out"
}
