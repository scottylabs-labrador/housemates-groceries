import { Text, View, Button, TextInput, TouchableOpacity} from "react-native";
import { Link } from "expo-router";
import React, { useState, useCallback , useEffect } from 'react';
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";
import { router } from "expo-router"

import "../main.css";
import { writeGroceryItem } from "../api/firebase";

export default function Page() {
    // TODO: Implement the list page
    // Display a list of grocery items
    // Allow users to add, remove, and update items
    const [code, onChangeCode] = useState('');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const housecode = urlParams.get('key');
    const [name, setNameHouse] = useState([]);
    const [members, setMembersHouse] = useState([]);
    const [choosencolor, setColor] = useState([]);
    const userid = "temp1"

    useEffect(() => {
        const fetchData = () => {
            const db = getDatabase();
            const itemRef = ref(db, 'houses/');
            get(itemRef).then((snapshot) => {
                const data = snapshot.val();
                setNameHouse(data[housecode].name)
                setMembersHouse(data[housecode].members)
            });
        }

        fetchData();
    });

    function setcolor(color){
        setColor(color)
        console.log(choosencolor)
    }

    function addMember(){
        console.log(choosencolor)
        const db = getDatabase();
        const postListRef = ref(db, 'houses/'+housecode+'/members/'+userid);
        set(postListRef, {
            name: "name",
            color: choosencolor
        });
        console.log(housecode)
        
        console.log(name)
        console.log(members)
    }

    return (
        <View className="flex-1 items-center padding-24">
        <View className="flex-1 justify-center w-9/12 max-w-6xl mx-auto mb-20">
            <Text className="mb-9 text-4xl justify-left text-center font-semibold">{name}</Text>
            <View className="flex-row justify-evenly items-center padding-24">
                <TouchableOpacity 
                    className="w-8 h-8 bg-red-600"
                    onPress = {()=>setcolor("red")}
                    >
                    <Text className="text-white text-center self-center"></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-8 h-8 bg-orange-600"
                    onPress = {()=>setcolor("orange")}
                    >
                    <Text className="text-white text-center self-center"></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-8 h-8 bg-yellow-600"
                    onPress = {()=>setcolor("yellow")}
                    >
                    <Text className="text-white text-center self-center"></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-8 h-8 bg-green-600"
                    onPress = {()=>setcolor("green")}
                    >
                    <Text className="text-white text-center self-center"></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-8 h-8 bg-blue-600"
                    onPress = {()=>setcolor("blue")}
                    >
                    <Text className="text-white text-center self-center"></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-8 h-8 bg-purple-600"
                    onPress = {()=>setcolor("purple")}
                    >
                    <Text className="text-white text-center self-center"></Text>
                </TouchableOpacity>
                
            </View>
            <View className="flex-row justify-evenly items-center padding-24">
                <Link href="/joinhousecode" asChild>
                <TouchableOpacity 
                    className="bg-gray-500 hover:bg-gray-600 mt-10 py-2.5 px-4 w-fit self-center rounded-lg"
                    >
                    <Text className="text-white text-center self-center">Back</Text>
                </TouchableOpacity>
                </Link>
                <Link href="/list" asChild>
                <TouchableOpacity 
                    className="bg-gray-500 hover:bg-gray-600 mt-10 py-2.5 px-4 w-fit self-center rounded-lg"
                    onPress = {()=>addMember()}
                    >
                    <Text className="text-white text-center self-center">Join House</Text>
                </TouchableOpacity>
                </Link>
            </View>
        </View>
        </View>
    );
}
