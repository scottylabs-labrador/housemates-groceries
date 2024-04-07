import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";

export default function List() {
    // TODO: Implement the list page
    // Display a list of grocery items
    // Allow users to add, remove, and update items

    const [groceryItems, setGroceryItems] = useState({});

    useEffect(() => {
        const fetchData = () => {
        const db = getDatabase();
        const itemRef = ref(db, 'groceryitems/');
        // let data;
        get(itemRef).then((snapshot) => {
            console.log(snapshot.val());
            const data = snapshot.val();
            setGroceryItems(data);
        });
        }

        fetchData();
    });

    return (
        <View className="flex-1 items-center padding-24">
        <View className="flex-1 w-full padding-24">
            {Object.keys(groceryItems).length > 0 ? (
                Object.keys(groceryItems).map(key => (
                <GroceryItem
                  key={key}
                  name={groceryItems[key].name}
                  quantity={groceryItems[key].quantity}
                />
                ))
            ) : (
                <View>
                    <Text className="text-3xl font-semibold text-center">Your list is empty!</Text>
                    <Text className="text-1xl text-center">Hit the "add" button to begin creating your shared list</Text>
                </View>
            )}
        </View>
        </View>
    );
}

const GroceryItem = ({name, quantity}) => {
    return (
        <View className="flex-row items-stretch justify-center w-9/12 self-center m-auto">
            <Text className="text-1xl text-left w-1/2">{name}</Text>
            <Text className="text-1xl text-right w-1/2">{quantity}</Text>
        </View>
    )
}