import { Image } from "react-native";

export class Housemate {
  userid: string;
  name: string;
  phone_number: string;
  email: string;
  house_ids: Array<House["housecode"]>;
 
  constructor(userid: string, name: string, email: string, phone_number: string) {
    this.userid = userid;
    this.name = name;
    this.phone_number = phone_number;
    this.email = email;
    this.house_ids = ["test1", "test2"];
  }
}

export class House {
  name: string;
  housecode: string;
  members: Array<Housemate["userid"]>;
  grocery_list: GroceryList;
  receipts: Array<Receipt>;

  constructor(name) {
    this.name = name;
    this.housecode = "";
    this.members = [];
    this.grocery_list = new GroceryList();
    this.receipts = [];
  }
}

export class GroceryItem {
  itemid: string;
  name: string;
  quantity: number;
  price: number;
  splits: Array<Housemate["userid"]>;
 
  constructor(name: string, quantity: number = 1, splits = []) {
    this.name = name;
    this.quantity = quantity;
    this.splits = splits;
  }
}

export class GroceryList {
  listid: string;
  items: Array<GroceryItem>;
 
  constructor() {
    this.items = [];
  }
}

export class Receipt {
  receiptid: string;
  name: string;
  image: Image;
  items: Array<GroceryItem>;

  constructor(name) {
    this.name = name;
    this.items = [];
  }
}