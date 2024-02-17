import React from 'react'
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

// import { GroceryItem } from './src/schemas';

export default function App() {

  const isHermes = () => !!global.HermesInternal;
  console.log('isHermes', isHermes());

  return (
    <AppProvider id={"application-0-drlvw"}>
      {/* <UserProvider fallback={LogIn}> */}
        <RealmProvider
          schema={[]}
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                // subs.add(realm.objects());
              },
            },
          }}>
            <View className="flex-1 items-center justify-center bg-white"> 
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
            </View>
         </RealmProvider>
      {/* </UserProvider> */}
    </AppProvider>
  );
}
