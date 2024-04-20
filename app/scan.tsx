import { Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from 'react';

import { Camera, CameraType } from 'expo-camera';

export default function Page() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const [receiptLines, setReceiptLines] = useState(0);

    let RECEIPT_API_URL = 'http://127.0.0.1:8000/receiptLines';

    useEffect(() => {
        fetch(RECEIPT_API_URL)
        .then((response) => {
          response.json().then((data) => {setReceiptLines(data.time);});
        });
      }, []);

    // if (!permission) ... 

    // if (!permission.granted) ... 

    function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
    <View className="flex-1 justify-center">
        <Camera className="flex-1" type={type}>
        <View className="flex-1 flex-row bg-transparent m-64">
            <Text className="text-6xl font-bold">{receiptLines}</Text>
            <TouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraType}>
            <Text className="text-2xl font-bold text-white">Flip Camera</Text>
            </TouchableOpacity>
        </View>
        </Camera>
    </View>
    );
}