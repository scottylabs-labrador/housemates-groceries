import { Image } from "react-native";

class Housemate {
  userid: string;
  name: string;
  username: string;
  house_ids: Array<House["housecode"]>;
 
  constructor(name, username, email) {
    this.name = name;
    this.username = username;
    this.userid = email;
    this.house_ids = [];
  }
}

class House {
  name: string;
  housecode: string;
  members: Array<Housemate["userid"]>;
  grocery_list: GroceryList;
  receipts: Array<Receipt>;

  constructor(name, housecode) {
    this.name = name;
    this.housecode = housecode;
    this.members = [];
    this.grocery_list = new GroceryList();
    this.receipts = [];
  }
}

class GroceryItem {
  itemid: string;
  name: string;
  quantity: number;
  price: number;
  splits: Array<Housemate["userid"]>;
 
  constructor(name, quantity = 1) {
    this.name = name;
    this.quantity = quantity;
    this.splits = [];
  }
}

class GroceryList {
  listid: string;
  items: Array<GroceryItem>;
 
  constructor() {
    this.items = [];
  }
}

class Receipt {
  receiptid: string;
  name: string;
  image: Image;
  items: Array<GroceryItem>;

  constructor(name) {
    this.name = name;
    this.items = [];
  }
}