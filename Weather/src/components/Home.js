import React from 'react'
import {Text,View, Dimensions} from 'react-native'
import { Button } from 'react-native-paper'
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg'
import { useNavigate } from 'react-router-dom'
import w1 from '../assets/w1.jpg'
const { height, width} =Dimensions.get('window');
const Home = () => {
const navigateTo = useNavigate();

    return(
        <>
        {/* <Image source={w1} style={{width:width, height:height/1.8}} /> */}
        <Svg height={height/1.5} width={width}>
                <ClipPath id='clippathid' >
                 <Ellipse cx={width} rx={height/2} ry={height/1.5} />
                </ClipPath>
                <Image href={require('../assets/w1.jpg')}
                height={height/1.5} width={width} preserveAspectRatio="xMidYMid slice"
                clipPath='url(#clippathid)'
                />
       </Svg>
        <View style={{margin:20}}>
          <Button mode='elevated' style={{marginBottom:10,height:50,paddingTop:5}} 
             onPress={()=>navigateTo('/CityWeather')}>
              <Text style={{fontSize:20, fontWeight:'500'}} >See Weather</Text>            
          </Button>  
          <Button mode='elevated' style={{marginBottom:10, height:50, paddingTop:5}} 
             onPress={()=>navigateTo('/Signin')}>
              <Text style={{fontSize:20, fontWeight:'500'}} >Sign In</Text>            
          </Button>      
        </View>
        </>
    )
}
export default Home; 