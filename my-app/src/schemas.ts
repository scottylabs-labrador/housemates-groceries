import Realm, { ObjectSchema } from 'realm';


export class GroceryItem extends Realm.Object<GroceryItem> {
        name!: string;
        price?: number;
    
        static schema: ObjectSchema = {
            name: 'GroceryItem',
            properties: {
                name: {type: 'string', indexed: true},
                price: 'int?',
            },
        };
}
  