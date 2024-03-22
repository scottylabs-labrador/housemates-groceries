import { Image } from 'react-native';
import Realm, { ObjectSchema } from 'realm';

export class House extends Realm.Object<House> {
    name!: string;
    house_code!: string;
    members!: Realm.List<string>;
    grocery_list!: GroceryList;
    receipts!: Realm.List<Receipt>;

    static schema: ObjectSchema = {
        name: 'House',
        properties: {
            name: 'string',
            house_code: 'string',
            members: 'Housemate[]',
            grocery_list: 'GroceryList',
            receipts: 'Receipt[]',
        },
        primaryKey: '_id',
    };
}

export class Housemate extends Realm.Object<Housemate> {
    _id!: string;
    name?: string;
    username!: string;
    password!: string;
    email?:string;


    static schema: ObjectSchema = {
        name: 'Housemate',
        properties: {
            _id: 'string',
            name: 'string',
            username: 'string',
            password: 'string',
            email: 'string',
            // inverse relation to House
            house: {
                type: 'linkingObjects',
                objectType: 'House',
                property: 'members'
            },
        },
        primaryKey: '_id',
    };
}

export class GroceryItem extends Realm.Object<GroceryItem> {
    _id!: number;
    name!: string;
    quantity!: number;
    price?: number;

    static schema: ObjectSchema = {
        name: 'GroceryItem',
        properties: {
            _id: 'int',
            name: 'string',
            quantity: 'int',
            price: 'float?',
            // inverse relation to GroceryList
            grocerylist: {
                type: 'linkingObjects',
                objectType: 'GroceryList',
                property: 'items'
            },
            // inverse relation to Receipt
            receipt: {
                type: 'linkingObjects',
                objectType: 'Receipt',
                property: 'items'
            },
        },
    };
}

export class GroceryList extends Realm.Object<GroceryList> {
    _id!: number;
    housemates!: Realm.List<Housemate>;
    items!: Realm.List<GroceryItem>;

    static schema: ObjectSchema = {
        name: 'GroceryList',
        properties: {
            _id: 'int',
            housemates: 'Housemate[]',
            items: 'GroceryItem[]'
        },
        primaryKey: '_id',
    };
}

export class Receipt extends Realm.Object<Receipt> {
    _id!: number;
    name!: string;
    image!: Image;
    items!: Realm.List<GroceryItem>;

    static schema: ObjectSchema = {
        name: 'Receipt',
        properties: {
            _id: 'int',
            name: 'string',
            image: 'Image',
            items: 'GroceryItem[]',
            // inverse relation to House
            house: {
                type: 'linkingObjects',
                objectType: 'House',
                property: 'receipts'
            },
        },
        primaryKey: '_id',
    };
}

  