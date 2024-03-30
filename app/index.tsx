import { Text, View, Button } from "react-native";
import { Link } from "expo-router";

import "../main.css";
import { writeGroceryItem } from "../api/firebase";

export default function Page() {
  // TODO: Home page
  // Should this exist for users who 

  return (
    <View className="flex-1 items-center padding-24">
      <View className="flex-1 justify-center max-w-4xl mx-auto">
        <Text className="text-6xl font-bold">Welcome</Text>
        <Link className="text-xl text-gray-400" href="/list">View Grocery List</Link>
        <Link className="text-xl text-gray-400" href="/scan">Scan Receipt</Link>
        <Button 
          title="Test"
          color="gray"
          onPress = {() => writeGroceryItem("chicken", 2)} />
      </View>
    </View>
  );
}
