import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function App() {

  const [image, setImage] = useState('');

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  }


  return (
    <SafeAreaView>
      <View>
        { image && <Image source={{ uri: image }} style={{ width: 350, height: 350 }} />}
        <View id='buttons'>
          <TouchableOpacity activeOpacity={0.8} onPress={handleImagePickerPress}>
            <Text>Open Picker</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={ () => setImage('')}>
            <Text>Reset Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );

  /*
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View id='buttons' style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleImagePickerPress}>
            <Text style={styles.buttonText}>Open Picker</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={ () => setImage('')}>
            <Text style={styles.buttonText}>Reset Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );*/

  /*
  const [image, setImage] = useState(null);

  useEffect(() => {
    launchImageLibrary({mediaType: 'photo'}, setImage);
  }, [] );

  useEffect(() => {
   if (image) {
    console.log("HELP");
    console.log(image);
   }
  }, [image] );
  */

  /*
  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path:"image",
        mediaType: 'photo'
      }}
      
    launchImageLibrary(options, response=>{
      console.log(response);
    });
  };

  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center bg-white">
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => {
          ImagePicker();
        }
        }>

          <Text>Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  ); */

}
