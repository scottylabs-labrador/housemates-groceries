import { View, Text, TextInput, Pressable, TouchableOpacity, Button } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Link } from "expo-router";
import { writeUserData } from "../api/firebase"; 
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
    // TODO: Implement the sign up page
    // Allow users to input name, email
    const { isLoaded, signUp, setActive } = useSignUp();

    const [firstName, onChangeName] = useState('');
    const [phoneNumber, onChangePhoneNumber] = useState('');
    const [emailAddress, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');

    const onSignUpPress = async () => {
        if (!isLoaded) {
          return;
        }
     
        try {
          await signUp.create({
            firstName,
            emailAddress,
            password,
          });
     
          // send the email.
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
     
          // change the UI to our pending section.
          setPendingVerification(true);
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2));
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) {
            return;
        }
        
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
            });
        
            await setActive({ session: completeSignUp.createdSessionId });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <View className="flex-1 items-center padding-24">
        {!pendingVerification && (
        <View className="flex-1 justify-center w-9/12 max-w-6xl mx-auto mb-20">
            <Text className="mb-9 text-4xl justify-left font-semibold">Registration</Text>
            <Text className="mb-2">Name</Text>
            <TextInput
                className="block bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={onChangeName}
                value={firstName}
            />
            <Text className="mb-2">Phone Number</Text>
            <TextInput
                className="block bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}
            />
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
            <Pressable 
                className="bg-gray-500 hover:bg-gray-600 mt-10 py-2.5 px-4 w-fit self-center rounded-lg"
                onPress = {onSignUpPress}
                >
                <Text className="text-white text-center self-center">Sign Up</Text>
            </Pressable>
        </View>
        )}
        {pendingVerification && (
        <View className="flex-1 justify-center w-9/12 max-w-6xl mx-auto mb-20">
            <Text className="mb-5 text-2xl justify-left font-semibold">Code</Text>
            <TextInput
                className="block bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 align-middle"
                onChangeText={(code) => setCode(code)}
            />
            <TouchableOpacity 
                className="bg-gray-500 hover:bg-gray-600 mt-4 py-2.5 px-4 w-fit self-center rounded-lg"
                onPress={onPressVerify}>
                <Text className="text-white text-center self-center">Verify Email</Text>
            </TouchableOpacity>
        </View>
        )}
        </View>
    );
}