/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';

import {
  DrawerLayoutAndroid,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,ImageBackground,Dimensions
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { useNavigate } from "react-router-dom";
import { Appbar,Button,Card, Avatar } from 'react-native-paper';;
import w8 from './src/assets/s2.jpg'
import nam from './src/assets/nam.jpg'

import ScreensNavigation  from './src/components/Routers'


const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Home",
    link :'/home'
  },
  {
    id: "58694a0f-3da1-471f-bd96-1571dse29d72",
    title: "Weather",
    link :'/CityWeather'
  }, 
  {
    id: "58694a0f-3da1-471f-bd96-145es57wsed1e2",
    title: "Sign In",
    link :'/Signin'
  },
  {
    id: "58694a0f-3da1-471f-bd9f6-14557wsed1e2",
    title: "Sign Up",   
    link :'/Signup'
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557wsed1e2",
    title: "Contact Us", 
    link :'/Contactus'
  }
];

const Item = ({ item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={[styles.list]}>
    
    <View  className='m-2'>        
      <Button         
         title={item.title}         
         onPress={onPress}
        //  mode='contained'
         mode='elevated'
         style={{backgroundColor:'white', height:50, borderRadius:50}}
       > <Text style={{color:'black',fontSize:18,fontWeight:'600'}}>{item.title} </Text> </Button>        
     </View>
    
  </TouchableOpacity>
);



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 
  const [selectedId, setSelectedId] = useState(null);
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const linkTo = useNavigate();
  
  const renderItem = ({ item }) => {
   
    return (
      <Item       
        item={item}
        onPress={() => {  
          linkTo(item.link)
          setSelectedId(item.id)
          drawer.current.closeDrawer()
        }
        }
        // backgroundColor={{ backgroundColor }}
        // textColor={{ color }}
      />
    );
  };
  const navigationView = () => (
    <View style={[styles.navigationContainer]}>
      <ImageBackground source={w8} resizeMode="cover" style={{height:800}} >
        <View style={{alignItems:'center', flexDirection:'row', marginTop:10}}>
        <Avatar.Image  size={60} source={nam} />          
        <Text style={{fontSize:30, fontWeight:'600', color:'white', paddingLeft:5}}>Meziany Said</Text>
          
        </View>       
       
      <SafeAreaView  >
        
          <FlatList
            data={DATA}
            className='m-4'
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            
          /> 
       
    </SafeAreaView>
    </ImageBackground>
    </View>
  );

  return (
    // <SafeAreaView style={backgroundStyle}>
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
   
      <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={280}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
      style={styles.navigationContainer}
     >
       <ScrollView
contentInsetAdjustmentBehavior="automatic">  
      <SafeAreaView>  
      <Appbar.Header 
      style={{ backgroundColor:'#1C82AD'}}
       >
      
        <Appbar.BackAction
          // onPress={() => linkTo(-1)} 
        />
        <Appbar.Content title="Weather in the world" />
        <Appbar.Action icon="menu" size={30} onPress={() => drawer.current.openDrawer()} />
     
      </Appbar.Header> 
         
      <SafeAreaView > 
      {/* <ImageBackground source={w8} resizeMode="cover" style={{height:800,shadowOpacity:0}} >        */}
            
     
          <ScreensNavigation/>
          
      {/* </ImageBackground> */}
       </SafeAreaView>  
      
      </SafeAreaView>
      </ScrollView>

    </DrawerLayoutAndroid>
    
      {/* 0000000000000000000 */}
     
    
    {/* // </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  navigationContainer:{
    backgroundColor:'#1C82AD',
    // #6d28d9
    
  },
  list:{
    margin:10,  
    fontSize:30,
    fontWeight:'600' 
  }
});

export default App;
