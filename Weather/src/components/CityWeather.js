import React ,{useState, useEffect} from 'react'
import { Easing, Image } from 'react-native';
import { Text,View ,StyleSheet,Dimensions} from 'react-native';
import {Card, ProgressBar, MD3Colors, Divider, Button} from 'react-native-paper'
import { SearchBar } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import pr1 from '../assets/pre1.png'

import win2 from '../assets/win2.png'
import hum2 from '../assets/hum2.png'
import pos1 from '../assets/pos1.png'
import k2 from '../assets/k2.jpg'
import clouds from '../assets/clouds.jpg'
import raining from '../assets/raining.jpg'
import fewclouds from '../assets/fewclouds.jpg'
import sunny from '../assets/sunny.jpg'


const {height,width} = Dimensions.get('window')
const _colorText = '#2C74B3'
const _colorBox = '#1C82AD'
const CityWeather = () => {

    const [city, setCity ] = useState('New York')
    const [weather, setWeather ] = useState(null)
    const [winddirection, setWindDirection] = useState(null)
    const [date, setDate ] = useState(null)
    const [sunrise, setSunRise] = useState()
    const [sunset, setSunSet] = useState();
    const [timeZone, setTimezone] = useState();
    const [imageDesc , setImageDesc ] = useState(k2);
    const [cod, setCod] = useState(false)
    const errormsg = "City Not Found, type correct city name !!!"

    let weatherApiKey = 'cca1ed7fa4e178aee2ba4c2b57100253';
    let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&cnt=7&appid=' + weatherApiKey
    // let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=7appid=' + weatherApiKey
   
    const getWeatherCityByName = async () => {
        
        let endpoint  = weatherBaseEndpoint + '&q=' + city ;
        let response = await fetch(endpoint);
        let wthr  = await response.json();
        let codd  = await wthr.cod;        
        if (codd === "404"){
          setCod(true)
        }else{
        setCod(false);
        setWeather(wthr);
        }
        const description = wthr.weather[0]["description"]

        if (description === "clear sky")
        {
          setImageDesc(k2)
        }else if (description === "few clouds")
          {
            setImageDesc(fewclouds)
          }else if (description === "clouds")
            {
              setImageDesc(clouds)
            }else if (description === "raining")
               {
                setImageDesc(raining)
               }else{
                setImageDesc(sunny)
               }
        
        const date = new Date(wthr.dt * 1000).toDateString()
        setDate(date)
        const srise =new Date(wthr.sys.sunrise * 1000).toTimeString().substring(0,5)
        setSunRise(srise)
        const sset = new Date(wthr.sys.sunset * 1000).toTimeString().slice(0,5)
        setSunSet(sset)
        const timeZone =new Date(wthr.timezone * 1000).toTimeString().slice(0,5)
        setTimezone(timeZone);

        let wind = await wthr.wind.deg
        if((wind >= 0 && wind <=23) || (wind >=337 && wind <= 360) ){
         setWindDirection('North')
        }
        if(wind >= 24 && wind <=68){
          setWindDirection('Northeast')
         }
        if(wind >= 69 && wind <=113){
          setWindDirection('East')
         }
        if(wind >= 114 && wind <=158){
          setWindDirection('Southeast')
         }
        if(wind >= 159 && wind <=203){
          setWindDirection('South')
         }
        if(wind >= 204 && wind <=248){
          setWindDirection('SouthWest')
         }
        if(wind >= 249 && wind <=293){
          setWindDirection('West')
         }
        if(wind >= 294 && wind <=336){
          setWindDirection('Northwest')
         }

    }

    useEffect(()=>{
          getWeatherCityByName();                   
    },[])

   return(
    <View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:width/1.22, borderRadius:50}}>
        <SearchBar 
            
                placeholder="Type Here a City ..."
                value={city}
                onChangeText={text => setCity(text)}               
                round
                searchIcon={{ size: 24 }}  
                style={{borderRadius:5}}             
                lightTheme                                            
                />
          </View>
        
        <Icon.Button
            name="search"
            backgroundColor="#46C2CB"
            style={{marginTop:10, paddingLeft:30,width:70,alignSelf:'center',}}
            onPress={() => getWeatherCityByName()}
      >        
      </Icon.Button>         
      </View>

{!cod ? (

<View   style={styles.container}>
<View style={{flexDirection:'row'}}>
  <Image source={pos1} style={{width:40,height:40, borderRadius:50,marginRight:10}} />
<Text style={styles.City}>{weather ? weather.name:null}</Text>

</View>

<View style={{marginTop:10}}>

<LinearGradient
  start={{x: 0.0, y: 0.50}}
  end={{x: 1, y: 4}}
  locations={[0, 0.4]}
  // '#8b5cf6'
  colors={['white', _colorBox]}
  style={styles.linearGradient}>

    <Text style={styles.Day}>{date}</Text>                    
    <Card.Cover source={imageDesc} />
    <View style={{justifyContent:'center', alignItems:'center'}} >
      {weather ? weather.weather.map(item => (
        <Text key={item.description} id='descri' style={styles.desc}>{item.description } </Text>
      )):null}
    </View>  
    <View>
    <Text style={{fontSize:20,fontWeight:'500',color:_colorText}}>Visibility: {weather ? weather.visibility:null}m</Text>
    </View>
    </LinearGradient>   

{/* <Divider style={{color:'white', height:2}}/> */}
<LinearGradient
  start={{x: 0.0, y: 0.50}}
  end={{x: 1, y: 4}}
  locations={[0, 0.4]}
  colors={['white', _colorBox]}
  style={styles.linearGradient}>
   <Text style={{fontSize:20, color:_colorText}}>temperature</Text>
     
<View style={{justifyContent:'center',alignItems:'center'}}>
   <Text style={styles.temp}>
   {weather ? weather.main.temp:null} 
   <Text style={{fontSize:30, color:_colorText}}>&deg;C</Text>

   </Text>
   <View style={{flexDirection:'row'}}>
   <Text style={{fontSize:30,color:_colorText}}>Min:{weather ? weather.main.temp_max:null} </Text>
   <Text style={{fontSize:30,color:_colorText, marginLeft:30}}>Max:{weather ? weather.main.temp_min:null} </Text>
   </View>

</View>
</LinearGradient>
{/* <Divider style={{color:'white', height:1.5}} /> */}

<View>
<LinearGradient
  start={{x: 0.0, y: 0.50}}
  end={{x: 1, y: 4}}
  locations={[0, 0.4]}
  colors={['white', _colorBox]}
  style={styles.linearGradient}>

    <Text style={{color:_colorText,fontSize:20, fontWeight:'600'}}> Pressure </Text>                   
  <View style={{marginTop:20, flexDirection:'row', flexWrap:'wrap'}}>
        <View style={{justifyContent:'center',width:(width/2)-40,flexDirection:'row', flexWrap:'wrap'}}>
            <Text style={{color:_colorText, fontSize:40, fontWeight:'600'}}> {weather ? weather.main.pressure:null} </Text>                   
        </View>
        <View style={{justifyContent:'flex-end', flexDirection:'row',flexWrap:'wrap',width:width/2, paddingBottom:20}}>
            <Image source={pr1} style={{width:80,height:80}} />
        </View>
 
  </View>
  </LinearGradient>

</View>
{/* <Divider style={{color:'white', height:1.5}} /> */}
<View>
<LinearGradient
  start={{x: 0.0, y: 0.50}}
  end={{x: 1, y: 4}}
  locations={[0, 0.4]}
  colors={['white', _colorBox]}
  style={styles.linearGradient}>

    <Text style={{color:_colorText,fontSize:20, fontWeight:'600'}}> Wind (km/h)</Text>                   
  <View style={{marginTop:20, flexDirection:'row', flexWrap:'wrap'}}>
        <View style={{justifyContent:'center',width:(width/2)-40, alignContent:'center', alignItems:'center'}}>
          <View>
          <Text style={{color:_colorText, fontSize:40, fontWeight:'600'}}> {weather ? weather.wind.speed:null} </Text>                   
          </View>
          <View>
          <Text style={{color:_colorText, fontSize:25, fontWeight:'400'}}>{winddirection ? winddirection:null}</Text>                   
          </View>

        </View>
        <View style={{justifyContent:'flex-end', flexDirection:'row',flexWrap:'wrap',width:width/2,paddingBottom:10}}>
            <Image source={win2} style={{width:100,height:100}} />
        </View>
 
  </View>
</LinearGradient>
</View>

<View>
<LinearGradient
  start={{x: 0.0, y: 0.50}}
  end={{x: 1, y: 4}}
  locations={[0, 0.4]}
  colors={['white', _colorBox]}
  style={styles.linearGradient}>
  
  <Text style={{color:_colorText,fontSize:20, fontWeight:'600'}}>Sun </Text>                   
  <View style={{marginTop:20, flexDirection:'row', flexWrap:'wrap'}}>
        <View style={{justifyContent:'center',width:(width/2)-40,alignItems:'center'}}>
          <View>
          <Text style={{ color:_colorText,fontSize:40, fontWeight:'600'}}> {sunrise}  </Text>                   
          </View>
          <View>
          <Text style={{ color:_colorText,fontSize:20, fontWeight:'400'}}> Sunrise</Text>                   
          </View>
        </View>
        <View style={{justifyContent:'center',width:(width/2)-40,alignItems:'center'}}>
        <View>
          <Text style={{ color:_colorText,fontSize:40, fontWeight:'600'}}> {sunset} </Text>                   
          </View>
          <View>
          <Text style={{ color:_colorText,fontSize:20, fontWeight:'400'}}>Sunset</Text>                   
          </View>                 
        </View>         
  </View>
</LinearGradient>
</View>


 <View style={styles.humidity}>
 <LinearGradient
  start={{x: 0.0, y: 0.50}}
  end={{x: 1, y: 4}}
  locations={[0, 0.4]}
  colors={['white', _colorBox]}
  style={styles.linearGradient}>
  <View style={{ flexDirection:'row', flexWrap:'wrap'}} >
    <View style={{justifyContent:'center',flexDirection:'row', flexWrap:'wrap', width:(width/2)-40}}>
     <AnimatedCircularProgress
        size={160}
        width={15}
        fill={weather ? weather.main.humidity:0}
        tintColor="#2C74B3"              
        backgroundColor="#f0fdf4" 
        lineCap='round'
        arcSweepAngle={300}
        rotation={210}                
        padding={10}
        renderCap={() => <Text style={{color:_colorText, marginTop:50, marginLeft:50, fontSize:40}}>{weather ? weather.main.humidity:null}%</Text>}
        duration={500}
        easing={Easing.out(Easing.ease)}
        />  
    </View>                      
    <View>
       <Text style={{ color:_colorText,fontSize:20, fontWeight:'400'}}>Humidity</Text> 
       <View style={{justifyContent:'flex-end',flexDirection:'row', flexWrap:'wrap', width:width/2, marginTop:25}}>

       <Image source={hum2} style={{width:80,height:80, borderRadius:50, alignSelf:'flex-end'}} />
       </View>
       
    </View>            
  </View>            
 </LinearGradient>
</View> 

<View>
<LinearGradient
  start={{x: 0.0, y: 0.50}}
  end={{x: 1, y: 4}}
  locations={[0, 0.4]}
  colors={['white', _colorBox]}
  style={styles.linearGradient}>
  
  <Text style={{color:_colorText,fontSize:20, fontWeight:'600'}}>Coordonnation & Timezone </Text>                   
  <View style={{marginTop:20}}>
        <View style={{}}>
            <Text style={{ color:_colorText,fontSize:20, fontWeight:'500'}}>Latitude    : {weather ? weather.coord.lat:null}</Text>                                                        
            <Divider style={{height:1.5}} />
            <Text style={{ color:_colorText,fontSize:20, fontWeight:'500'}}>Longitude : {weather ? weather.coord.lon:null}</Text>                                                        
            <Divider style={{height:1.5}} />
            <Text style={{ color:_colorText,fontSize:20, fontWeight:'500'}}>timezone  : {timeZone}</Text>                                                        
           
        </View>                      
  </View>
</LinearGradient>
</View>


</View>              
</View>


    ): (
      <View>
        <LinearGradient
            start={{x: 0.0, y: 0.50}}
            end={{x: 1, y: 4}}
            locations={[0, 0.4]}
            colors={['white', _colorBox]}
            style={styles.linearGradient}>
        <Text style={{fontSize:30, fontWeight:'500',color:'black', padding:10}}>
          {errormsg}
          </Text> 

  </LinearGradient>
      </View>
    ) }
    
    </View>
   )
}

const styles = StyleSheet.create({
  
    container:{
     margin:4
    },
    
    City:{
        fontSize:30,
        fontWeight:'600',
        color:'white'
    },
   Day:{
    fontSize:20,
    fontWeight:'600',
    color:_colorText,
    marginTop:5,
  },
  desc:{
    fontSize:30,
    fontWeight:'600',
    color:_colorText,
    marginTop:5,
    textTransform:'uppercase'
  },
 temp:{
        fontSize:90,
        fontWeight:'900',
        color:_colorText
    },
 humidity:{
    flex:1,
    position:'relative'
},
humidityText:{
    marginLeft:200,
    position:'relative',
},
linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginTop: 16,
    width:width-10,
    borderRadius:20,
  },
})

export default CityWeather;