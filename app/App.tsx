import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { writeUserData } from './src/db';

export default function App() {

  // const isHermes = () => !!global.HermesInternal;
  // console.log('isHermes', isHermes());

  return (
    <View className="flex-1 items-center justify-center bg-white"> 
    <Text>Open up App.js to start working on your app!</Text>
    <Button onPress={() => writeUserData('1', 'name', 'email', 'imageUrl')} title="Write Data" />
    <StatusBar style="auto" />
    </View>
  );
}
