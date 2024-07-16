import { View, Text, Pressable, ScrollView, Modal, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";
import { writeGroceryItem } from "../api/firebase";
import { Link } from "expo-router"; 
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function List() {
    // TODO: Implement the list page
    // Display a list of grocery items
    // Allow users to add, remove, and update items

    const [groceryItems, setGroceryItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, onChangeItem] = useState('');

    useEffect(() => {
        const fetchData = () => {
            const db = getDatabase();
            const itemRef = ref(db, 'groceryitems/');
            get(itemRef).then((snapshot) => {
                const data = snapshot.val();
                setGroceryItems(data);
            });
        }

        fetchData();
    });

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const renderItem = ({ item }) => {
        return (
            <GroceryItem
                key={item}
                name={groceryItems[item].name}
                quantity={groceryItems[item].quantity}
            />
        );
    }

    const handleAddItem = (e) => {
        const key = e.nativeEvent.key 
        if (key === "Enter") {
            writeGroceryItem(item, 1, ["testuser"])
        }
    }

    return (
        <View className="flex-1 items-center">
            <View className="flex-1 w-full h-full bg-[#3e5636]">
                <View className="my-16 h-fit">
                    <Text className="text-1xl text-center text-white">Home</Text>
                    <Text className="text-4xl text-center text-white">This week's list</Text>
                </View>
                <View className="w-full h-[200px] flex-grow mb-16 bg-white self-end rounded-t-[40px] pt-6 overflow-hidden mb-0">
                    <View className="flex-row items-stretch justify-center w-9/12 h-10 self-center">
                        <Text className="text-1xl text-left text-gray-400 w-1/2">Item</Text>
                        <Text className="text-1xl text-right text-gray-400 w-1/2">Split by:</Text>
                    </View>
                    {/* <ScrollView>
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
                    </ScrollView> */}
                    {Object.keys(groceryItems).length > 0 ? (
                        <FlatList 
                        className="h-full"
                        data={Object.keys(groceryItems)}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        />
                    ) : (
                        <View>
                            <Text className="text-3xl font-semibold text-center">Your list is empty!</Text>
                            <Text className="text-1xl text-center">Hit the "add" button to begin creating your shared list</Text>
                        </View>
                    )}
                </View>
                <View className="justify-center bg-white h-16 w-full fixed bottom-0 items-center m-0">
                    <View className="w-3/4 flex-row flex space-x-4 justify-between">
                        <Link href="/" asChild>
                            <Ionicons
                                name="home-outline" 
                                size={24} 
                                color="gray"/>
                        </Link>
                        <Link href="/" asChild>
                            <Ionicons
                                name='camera'
                                size={24}
                                color="gray"
                                onPress={toggleModal}/>
                        </Link>
                        <Link href="/" asChild>
                            <FontAwesome
                                name='user-circle'
                                size={24}
                                color="pink"
                                onPress={toggleModal}/>
                        </Link>
                    </View>
                </View>

                <Link href="/" asChild>
                    <Pressable 
                        className="absolute w-fit h-8 items-center justify-center left-[7%] bottom-28 bg-[#3e5636] hover:bg-gray-600 py-2.5 px-4 rounded-lg shadow-lg"
                    >
                        <Text className="text-white text-center self-center">See Past Items</Text>
                    </Pressable>
                </Link>
                <Pressable 
                    className="absolute w-10 h-8 items-center justify-center right-[10%] bottom-28 shadow-lg"
                    onPress={toggleModal}
                >
                    <Ionicons name="add-circle" size={76} color="#3e5636"/>
                </Pressable>
                
                <Modal 
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                >
                    <View className="w-2/3 h-1/3 m-auto bg-white rounded-lg p-10 align-center">
                        <Ionicons
                            name='close'
                            size={24}
                            onPress={toggleModal}/>
                        <Text className="self-center">Add Item</Text>
                        <TextInput
                            className="block bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                            onChangeText={onChangeItem}
                            value={item}
                            placeholder="Add Item..."
                            onKeyPress={handleAddItem}
                        />
                        <Pressable 
                            className="bg-[#3e5636] hover:bg-gray-600 mt-10 py-2.5 px-4 w-fit self-center rounded-lg"
                            >
                            <Text className="text-white text-center self-center">See All Past Items</Text>
                        </Pressable>
                    </View>
                </Modal>

            </View>
        </View>
    );
}

const GroceryItem = ({name, quantity}) => {
    return (
        <View className="flex-row items-stretch justify-center w-[90%] h-12 self-center my-2 px-6 border border-gray-300 rounded-lg">
            <Text className="text-1xl text-left w-1/2 self-center">{name}</Text>
            <Text className="text-1xl text-right w-1/2 self-center">{quantity}</Text>
        </View>
    )
}