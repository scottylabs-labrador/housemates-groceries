import { View, Text, TouchableOpacity } from 'react-native';

import { readGroceryItems } from "../api/firebase"; 

export default function List() {
    // TODO: Implement the list page
    // Display a list of grocery items
    // Allow users to add, remove, and update items

    return (
        <View className="flex-1 items-center padding-24">
        <View className="flex-1 justify-center max-w-4xl mx-auto">
            <Text className="text-6xl font-bold">Eggs</Text>
            <Text className="text-6xl font-bold">Honeycrisp Apples</Text>
            <Text className="text-6xl font-bold">Japanese Yams</Text>
        </View>
        <TouchableOpacity 
                className="bg-gray-500 hover:bg-gray-600 py-2.5 px-4 w-fit self-center rounded-lg"
                onPress = {() => readGroceryItems}
                >
                <Text className="text-white text-center self-center">Test Read</Text>
            </TouchableOpacity>
        </View>
    );
}