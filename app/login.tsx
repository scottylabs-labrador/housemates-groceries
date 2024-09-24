import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

import "../main.css";
import { writeGroceryItem } from "../api/firebase";

export default function Page() {
    // TODO: Implement the list page
    // Display a list of grocery items
    // Allow users to add, remove, and update items

    return (
      <View className="flex-1 items-center padding-24">
      <View className="flex-1 justify-center max-w-4xl mx-auto">
        <Text className="text-4xl font-bold self-center">You're In!</Text>
        <Link href="/joinhousecode" asChild>
          <TouchableOpacity 
              className="bg-gray-500 hover:bg-gray-600 mt-14 py-2.5 px-4 w-fit self-center rounded-lg"
              >
              <Text className="text-white text-center self-center">Join House</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/createhouse" asChild>
          <TouchableOpacity 
              className="bg-gray-500 hover:bg-gray-600 mt-4 mb-2 py-2.5 px-4 w-fit self-center rounded-lg"
              >
              <Text className="text-white text-center self-center">Create House</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
    );
}
