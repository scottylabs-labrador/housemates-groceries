import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

import TextRecognition from 'react-native-text-recognition';

//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function App() {

  const [image, setImage] = useState('');
  const [text, setText] = useState('');

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: true, 
        base64: true, 
        allowsMultipleSelection: false,       
        aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      performOCR(result.assets[0]);

      console.log(result.assets[0].uri);

      //const OCRresult = await TextRecognition.recognize(image);
      //console.log(OCRresult[0]);


      /*
      // First, initiate the Optiic lib
      const Optiic = require('optiic');
      const optiic = new Optiic({apiKey: 'SGCasFAtH4N4Y3CIIBIM9oXBYFE2'});
  
      optiic.process({
      image: image
      })
      .then(result => {console.log(result);
        setText(result);
        //setText(OCRresult[0]);
      })*/


    }

    //processImage();
  }

  const performOCR = (file) => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "u91fAePehfFUDBqvddiCGa0kNtajh4dB");

    
    myHeaders.append( 
        "Content-Type", 
        "multipart/form-data"
        ); 

    var raw = file;

    var requestOptions = {
      method: 'POST',
      redirect: "follow", 
      headers: myHeaders,
      body: raw
    };

    fetch("https://api.apilayer.com/image_to_text/upload", { method: 'POST', redirect: 'follow', headers: myHeaders,
    body: raw})
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  /*
  const processImage = async () => {
    console.log(image);
    const OCRresult = await TextRecognition.recognize(image);
    console.log(OCRresult);
    setText(OCRresult);
  }*/

  return (
    <SafeAreaView>
      <View>
        {image && <Image source={{ uri: image }} style={{ width: 350, height: 350 }} />}
        {text ? <Text>
          {text}
        </Text> : null}
        <View id='buttons'>
          <TouchableOpacity activeOpacity={0.8} onPress={handleImagePickerPress}>
            <Text>Open Picker</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setImage('')}>
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

