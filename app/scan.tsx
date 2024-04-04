import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Page() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    // if (!permission) ... 

    // if (!permission.granted) ... 

    function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
    <View className="flex-1 justify-center">
        <Camera className="flex-1" type={type}>
        <View className="flex-1 flex-row bg-transparent m-64">
            <TouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraType}>
            <Text className="text-2xl font-bold text-white">Flip Camera</Text>
            </TouchableOpacity>
        </View>
        </Camera>
    </View>
    );
}