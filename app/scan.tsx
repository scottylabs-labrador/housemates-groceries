import { Text, View } from "react-native";
import React, { useState, useEffect } from 'react';

export default function Page() {
    
    // TODO: Implement the scan page
    // Camera access and integration with OCR

    const [receiptLines, setReceiptLines] = useState(0);

    let RECEIPT_API_URL = 'http://127.0.0.1:8000/receiptLines';

    useEffect(() => {
        fetch(RECEIPT_API_URL)
        .then((response) => {
          response.json().then((data) => {setReceiptLines(data.time);});
        });
      }, []);
    
    return(
        <View className="flex-1 items-center padding-24">
        <View className="flex-1 justify-center max-w-4xl mx-auto">
            <Text className="text-6xl font-bold">{receiptLines}</Text>
        </View>
        </View>
    );
}