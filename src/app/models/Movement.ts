import {Goods} from "./Goods";
import {Warehouse} from "./Warehouse";

export interface Movement {
  id: string;
  creationDateTime: string;
  creationUser: string;
  movementDateTime: string;
  location: string;
  goods: Goods;
  customsStatus: string;
  referenceAuthorization: string;
  typeAuthorization: string;
  typeMovement: string;
  fromWarehouse: Warehouse;
  toWarehouse: Warehouse;
  }
