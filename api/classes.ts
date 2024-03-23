class Housemate {
  userid: string;
  name: string;
  username: string;
  password: string;
  email: string;
  grocerylist: string;
 
  constructor(name, username, password, email) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

class GroceryItem {
  itemid: string;
  name: string;
  quantity: number;
  HousemateList: Array<Housemate>;
 
  constructor(name, quantity = 1) {
    this.name = name;
    this.quantity = quantity;
  }
}

class GroceryList {
  listid: string;
  joincode: string;
  name: string;
  HousemateList: Array<Housemate>;
  GroceryItemList: Array<GroceryItem>;
 
  constructor(name) {
    this.name = name;
    this.HousemateList = []
    this.GroceryItemList = []
  }
}