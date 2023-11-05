import {Goods} from "./Goods";

export interface Movement {
  id: string;
  creationDateTime: string;
  creationUser: string;
  movementDateTime: string;
  location: string;
  goods: Goods;
  customsStatus: string;
  codeWarehouse: string;
  labelWarehouse: string;
  referenceAuthorization: string;
  typeAuthorization: string;
  typeMovement: string;
  }
