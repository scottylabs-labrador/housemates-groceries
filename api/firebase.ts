import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import * as schema from "./classes";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  // databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DB_URL,
  apiKey: "AIzaSyBB6cMQdCcF-3e4JkHIDHgMzWul-V_zLmU",
  authDomain: "housemates-groceries.firebaseapp.com",
  databaseURL: "https://housemates-groceries-default-rtdb.firebaseio.com",
  projectId: "housemates-groceries",
  storageBucket: "housemates-groceries.appspot.com",
  messagingSenderId: "566820107547",
  appId: "1:566820107547:web:f75f358e8168c967bc4fbe",
  measurementId: "G-MNSQVX483P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export function writeUserData(name, email, phone_number) {
  const db = getDatabase();
  const postListRef = ref(db, 'housemates/');
  const newPostRef = push(postListRef);
  const user = new schema.Housemate(newPostRef.key, name, email, phone_number);
  set(newPostRef, {
    name: user.name,
    email: user.email,
    phone_number: user.phone_number, 
    houses: user.house_ids
  });
}

export function writeGroceryItem(name, quantity) {
  const db = getDatabase();
  const item = new schema.GroceryItem(name, quantity);
  const postListRef = ref(db, 'groceryitems/');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    name: item.name,
    quantity: item.quantity,
    splits: item.splits
  });
}

export function readGroceryItems() {
  const db = getDatabase();
  const itemRef = ref(db, 'groceryitems/');
  onValue(itemRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    console.log("hi");
    return data;
  })
}

export function writeHouseData(name) {
  const db = getDatabase();
  const house = new schema.House(name);
  const postListRef = ref(db, 'houses/');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    name: house.name,
  });
}

