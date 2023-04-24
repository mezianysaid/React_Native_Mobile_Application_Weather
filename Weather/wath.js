import * as React from 'react';
import {View,Text, StyleSheet, Dimensions, Button} from 'react-native'
// e35e421fbb6c0b4e37e8d999c7086ca2







const Home = () => {
    let weatherApiKey = 'cca1ed7fa4e178aee2ba4c2b57100253';
    let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&cnt=7&appid=' + weatherApiKey
    // let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=7appid=' + weatherApiKey
    

    const getWatherByCityName = async (city) => {
        let endpoint  = weatherBaseEndpoint + '&q=' + city ;
        let response = await fetch(endpoint);
        let weather  = await response.json();
        console.log('new 7 fes is weather:\n', weather);
    }
    // getWatherByCityName('New York')
  return(
    <View>        
    <Button title='weather'  />
   
  </View>
  )};
  const styles = StyleSheet.create({
   
   
  });



export default Home;
