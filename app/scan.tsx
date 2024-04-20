import { Text, View } from "react-native";
import React, { useState, useEffect } from 'react';

export default function Page() {
    
    // TODO: Implement the scan page
    // Camera access and integration with OCR

    const [receiptLines, setReceiptLines] = useState(0);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/receiptLines", {
            "mode": "no-cors", 
            // headers: {  
              // Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"  
            // }  
          }).then(res => {
            console.log(res);
            return res.json()
          }).then(data => {
            setReceiptLines(data.time);
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