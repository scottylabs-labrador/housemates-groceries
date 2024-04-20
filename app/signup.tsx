import { View, Text, TextInput, Pressable, TouchableOpacity, Button } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Link } from "expo-router";
import { writeUserData } from "../api/firebase"; 

export default function SignUp({route, navigation, ...props}) {
    // TODO: Implement the sign up page
    // Allow users to input name, email
    const [name, onChangeName] = useState('');
    const [phoneNumber, onChangePhoneNumber] = useState('');
    const [email, onChangeEmail] = useState('');

    return (
        <View className="flex-1 items-center padding-24">
        <View className="flex-1 justify-center w-9/12 max-w-6xl mx-auto mb-20">
            <Text className="mb-9 text-4xl justify-left font-semibold">Registration</Text>
            <Text className="mb-2">Name</Text>
            <TextInput
                className="block bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={onChangeName}
                value={name}
            />
            <Text className="mb-2">Phone Number</Text>
            <TextInput
                className="block bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}
            />
            <Text className="mb-2">Email</Text>
            <TextInput
                className="block  bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={onChangeEmail}
                value={email}
            />
            <Link href="/login" asChild>
            <Pressable 
                className="bg-gray-500 hover:bg-gray-600 mt-10 py-2.5 px-4 w-fit self-center rounded-lg"
                onPress = {() => writeUserData(name, email, phoneNumber)}
                >
                <Text className="text-white text-center self-center">Sign Up</Text>
            </Pressable>
            </Link>
        </View>
        </View>
    );
}