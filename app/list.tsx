import { View, Text } from 'react-native';

export default function Page() {
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
        </View>
    );
}