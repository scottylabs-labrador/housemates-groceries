import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";

//import TextRecognition from 'react-native-text-recognition';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import OpenAI from 'openai';

export default function Page() {
    
    // TODO: Implement the scan page
    // Camera access and integration with OCR
    
    /*
      const [image, setImage] = useState(null);
    
      useEffect(() => {
        launchImageLibrary({mediaType: 'photo'}, setImage);
      }, [] );
    
      useEffect(() => {
       if (image) {
        console.log(image);
       }
      }, [image] );
      
      
      const ImagePicker = () => {
        let options = {
          storageOptions: {
            path:"image",
            mediaType: 'photo'
          }}
          
        launchImageLibrary(options, response=>{
          console.log(response);
        });
      }; */

      const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
      });

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
    
      return (
        <SafeAreaView>
          <View className="flex-1 items-center justify-center bg-white">
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
      ); 
}