import { View, Text, TextInput, Pressable, TouchableOpacity, Button } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Link } from "expo-router";

export default function Login() {
    // TODO: Implement the sign up page
    // Allow users to input name, email

    const [emailAddress, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    return (
        <View className="flex-1 items-center padding-24">
        <View className="flex-1 justify-center w-9/12 max-w-6xl mx-auto mb-20">
            <Text className="mb-9 text-4xl justify-left font-semibold">Login</Text>
            <Text className="mb-2">Email</Text>
            <TextInput
                className="block bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={onChangeEmail}
                value={emailAddress}
            />
            <Text className="mb-2">Password</Text>
            <TextInput
                className="block bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={onChangePassword}
                secureTextEntry={true}
                value={password}
            />
            <TouchableOpacity 
                className="bg-gray-500 hover:bg-gray-600 mt-10 py-2.5 px-4 w-fit self-center rounded-lg"
                >
                <Text className="text-white text-center self-center">Login</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}