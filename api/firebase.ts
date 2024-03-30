import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
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

export function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
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
