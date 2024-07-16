import { Text, View, Button, TouchableOpacity, Pressable, TextInput } from "react-native";
import { Link } from "expo-router";
import React, { useState, useCallback } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import List from "./list";
import SignUp from "./signup";
import Login from "./login";

import "../main.css";


export default function Page() {
  // TODO: Home page
  // Should this exist for users who 
 
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <List/>
      </SignedIn>
      <SignedOut>
        {/* <View className="flex-1 items-center padding-24">
          <View className="flex-1 justify-center max-w-4xl mx-auto">
            <Text className="text-4xl font-bold self-center">Welcome to Green</Text>
            <Link href="/signup" asChild>
              <Pressable 
                  className="bg-gray-500 hover:bg-gray-600 mt-14 py-2.5 px-4 w-1/3 self-center rounded-lg"
                  >
                  <Text className="text-white text-center self-center">Sign Up</Text>
              </Pressable>
            </Link>
            <Link href="/login" asChild>
              <TouchableOpacity 
                  className="bg-gray-500 hover:bg-gray-600 mt-4 mb-2 py-2.5 px-4 w-1/3 self-center rounded-lg"
                  >
                  <Text className="text-white text-center self-center">Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View> */}
        {/* <SignUp /> */}
        <Login />
      </SignedOut>
    </ClerkProvider>
  );
}
