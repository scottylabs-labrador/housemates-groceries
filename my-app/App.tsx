import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

import OpenAI from 'openai';

import TextRecognition from 'react-native-text-recognition';

//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function App() {

  const openai = new OpenAI({
    apiKey: "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"//process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

  const [image, setImage] = useState('');
  //const [text, setText] = useState({});

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
      //console.log(result.assets[0].uri);

      setImage(result.assets[0].uri);
      //setText({"lang": "en", "all_text": "501 West Waterfront Dr.\nWest Homestead, PA 15120\n08 Member 111969855901\n1730354 DC MANDARINS\nE\nE\n21020 VINE TOMATO\n1706523 NORI SEASALT\nE\nE\n427381 KS ORG EGGS\nE\n427381 KS ORG EGGS\nE\nE\nE\nE\n30669 BANANAS\n45579 CANDY HEART\n60357 MIXED PEPPER\n8 2% MILK 1GAL\nE\n1508436 PUREPROTEIN\nE 1769225 ESPRESSO MIX\n0000322850 /1769225\nE\nE\n1092438 ORG CHSINUTS\n10.99\n6.29\n7.49\n7.49\n7.49\n1.49\n6.99\n6.89\n4.19\n23.89\n9.49\n3.00-", "annotations": ["501", "West", "Waterfront", "Dr.", "West", "Homestead", ",", "PA", "15120", "08", "Member", "111969855901", "1730354", "DC", "MANDARINS", "E", "E", "21020", "VINE", "TOMATO", "1706523", "NORI", "SEASALT", "E", "E", "427381", "KS", "ORG", "EGGS", "E", "427381", "KS", "ORG", "EGGS", "E", "E", "E", "E", "30669", "BANANAS", "45579", "CANDY", "HEART", "60357", "MIXED", "PEPPER", "8", "2", "%", "MILK", "1GAL", "E", "1508436", "PUREPROTEIN", "E", "1769225", "ESPRESSO", "MIX", "0000322850", "/", "1769225", "E", "E", "1092438", "ORG", "CHSINUTS", "10.99", "6.29", "7.49", "7.49", "7.49", "1.49", "6.99", "6.89", "4.19", "23.89", "9.49", "3.00"]})
      //performOCR(result.assets[0]);
      //var testOutput = {"lang": "en", "all_text": "Healthtest Grocery Store\nMP\nUFM CLEMENTINE BAG\nSYDLC CNUT COFE CR\nCROFT STRAUBRY SPR\n1.19 LB @ 2.49 /lb\nUT\nBEANS GREEN\n2.33 LB.99 /lb\nWT\nBANANA OG\nVIRGL CREAM SODA\nIMA TOMATO BASIL S\nBULK ALMOND BUTTER\nMTICA PARM REG GRA\nBC NF VAN GRK YORT\nBC NF VAN GRK YGRT\n365 LT CHNK TUNA\nBC NF VAN GRK YGRT\nBC NF VAN GRK YGRI\nANCH OG CINN HOT C\nBLACKBERRIES\nBRM THCK RLD OATS\nTARE\nBAG REFUND\nITEM\nTARE\n6.99 F\n3.49 F\n4.99 F\n01\n2.96 F\n4066\n4.99 B\n3.99 F\n5.77 F\n4.23 F\n1.39 F\n1.39 F\n2.59 F\n1.39 F\n.01\n2.31 F\nITEM 94237\n1.39 F\n6.99 F\n3.99 F\n4.99 F\n10-\nITEM 486408\n.","annotations": ["Healthtest", "Grocery", "Store", "MP", "UFM", "CLEMENTINE", "BAG", "SYDLC", "CNUT", "COFE", "CR", "CROFT", "STRAUBRY", "SPR", "1.19", "LB", "@", "2.49", "/", "lb", "UT", "BEANS", "GREEN", "2.33", "LB.99", "/", "lb", "WT", "BANANA", "OG", "VIRGL", "CREAM", "SODA", "IMA", "TOMATO", "BASIL", "S", "BULK", "ALMOND", "BUTTER", "MTICA", "PARM", "REG", "GRA", "BC", "NF", "VAN", "GRK", "YORT", "BC", "NF", "VAN", "GRK", "YGRT", "365", "LT", "CHNK", "TUNA", "BC", "NF", "VAN", "GRK", "YGRT", "BC", "NF", "VAN", "GRK", "YGRI", "ANCH", "OG", "CINN", "HOT", "C", "BLACKBERRIES", "BRM", "THCK", "RLD", "OATS", "TARE", "BAG", "REFUND", "ITEM", "TARE", "6.99", "F", "3.49", "F", "4.99", "F", "01", "2.96", "F", "4066", "4.99", "B", "3.99", "F", "5.77", "F", "4.23", "F", "1.39", "F", "1.39", "F", "2.59", "F", "1.39", "F", ".01", "2.31", "F", "ITEM", "94237", "1.39", "F", "6.99", "F", "3.99", "F", "4.99", "F", "10", "ITEM", "486408", "."]};
      var testOutput = { "lang": "en", "all_text": "501 West Waterfront Dr.\nWest Homestead, PA 15120\n08 Member 111969855901\n1730354 DC MANDARINS\nE\nE\n21020 VINE TOMATO\n1706523 NORI SEASALT\nE\nE\n427381 KS ORG EGGS\nE\n427381 KS ORG EGGS\nE\nE\nE\nE\n30669 BANANAS\n45579 CANDY HEART\n60357 MIXED PEPPER\n8 2% MILK 1GAL\nE\n1508436 PUREPROTEIN\nE 1769225 ESPRESSO MIX\n0000322850 /1769225\nE\nE\n1092438 ORG CHSINUTS\n10.99\n6.29\n7.49\n7.49\n7.49\n1.49\n6.99\n6.89\n4.19\n23.89\n9.49\n3.00-", "annotations": ["501", "West", "Waterfront", "Dr.", "West", "Homestead", ",", "PA", "15120", "08", "Member", "111969855901", "1730354", "DC", "MANDARINS", "E", "E", "21020", "VINE", "TOMATO", "1706523", "NORI", "SEASALT", "E", "E", "427381", "KS", "ORG", "EGGS", "E", "427381", "KS", "ORG", "EGGS", "E", "E", "E", "E", "30669", "BANANAS", "45579", "CANDY", "HEART", "60357", "MIXED", "PEPPER", "8", "2", "%", "MILK", "1GAL", "E", "1508436", "PUREPROTEIN", "E", "1769225", "ESPRESSO", "MIX", "0000322850", "/", "1769225", "E", "E", "1092438", "ORG", "CHSINUTS", "10.99", "6.29", "7.49", "7.49", "7.49", "1.49", "6.99", "6.89", "4.19", "23.89", "9.49", "3.00"] };
      processOCR(testOutput);

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

    fetch("https://api.apilayer.com/image_to_text/upload", {
      method: 'POST', redirect: 'follow', headers: myHeaders,
      body: raw
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);


        //setText(result);
      })
      .catch(error => console.log('error', error));
  };


  const processOCR = async (ocrResult) => {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: 'You are a data extraction tool. Create two arrays, one for grocery items and one for prices. For each line in the given string, if it contains a grocery item or a price, store the portion of the line with the item or price into the corresponding array. If it contains neither, do not do anything with the line. Keep the order of insertion into the arrays the same as the original given order. Return these two arrays in a JSON object, with "grocery_items" as the key for the grocery items array and "prices" as the key for the prices array.'},
        {role: 'user', content: 'Text: ' + ocrResult["all_text"]}
      ],
      model: 'gpt-3.5-turbo-1106', //'gpt-3.5-turbo',
    });

    console.log(chatCompletion.choices[0]);
  }

  const processOCR_rulebased = (ocrResult) => {
    var allText = ocrResult["all_text"];
    var allTextArr = allText.split("\n");

    var groceryItemsArr = [];
    var pricesArr = [];

    var miscArr = [];

    var firstPriceIdx = -1;

    for (let i = 0; i < allTextArr.length; i++) {
      if (/[a-z]{3}/i.test(allTextArr[i])) {
        groceryItemsArr.push(allTextArr[i]);
      } else if(/[0-9]{1,3}\./.test(allTextArr[i])) {
        var priceLineArr = allTextArr[i].split(" ");

        pricesArr.push(allTextArr[i]);
      } else {
        miscArr.push(allTextArr[i]);
      }
    }

    console.log(allTextArr);
    console.log(groceryItemsArr);
    console.log(pricesArr);

    /*
    var allText = ocrResult["all_text"];
    var allTextArr = allText.split("\n");

    var cleanedTextArr = [];
    var firstPriceIdx = -1;

    for (let i = 0; i < allTextArr.length; i++) {
      if (allTextArr[i].length > 3 || ) {
        cleanedTextArr.push(allTextArr[i]);
      }
    }

    for (let i = 0; i < cleanedTextArr.length; i++) {

      if (firstPriceIdx == -1 && !Number.isNaN(Number(cleanedTextArr[i]))) {
        firstPriceIdx = i;
      }
    }

    console.log(allTextArr);
    console.log(cleanedTextArr);
    console.log(firstPriceIdx);
    */
  } 

  /*
  const processImage = async () => {
    console.log(image);
    const OCRresult = await TextRecognition.recognize(image);
    console.log(OCRresult);
    setText(OCRresult);
  }*/

  /*{text ? <Text>
          {text.toString()}
        </Text> : null}
  */

  return (
    <SafeAreaView>
      <View>
        {image && <Image source={{ uri: image }} style={{ width: 350, height: 350 }} />}

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

