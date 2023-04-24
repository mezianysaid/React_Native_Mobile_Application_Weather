import React ,{ useState,useEffect} from "react";
import {View,Image, ImageBackground,StyleSheet,TouchableOpacity, Dimensions} from 'react-native'
import { Divider, ListItem,  } from 'react-native-elements'
import { Card, TextInput,Button} from 'react-native-paper'
import {
    Text, VStack, Box, FormControl,Input,Stack
} from 'native-base'
import { useNavigate } from "react-router-dom";
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window')
const Signin = () => {
    const initValues ={username:'',email:'',password:''}
    const [formData, setFormData] = useState(initValues)
    const [Errors, setErrors ]  = useState({})

    const submitHandler = (e) => {
      e.preventDefault()
      Validate() ? console.log("Submitted"):console.log("submitting failed");;
    }
    const Validate = () => {
        if(formData.username === undefined){
            setErrors({...Errors,
                username: "username is required"});
                return false;
        } else if(formData.username.length < 3) {
            setErrors({...Errors,
            username: "username is too short"});
            return false;
        }
        if(formData.email === undefined){
            setErrors({...Errors,
                email: "email is required"});
                return false;
        }else if(formData.email.length < 3){
            setErrors({...Errors,
            email: "email is too short"});
            return false;
        }
        if(formData.password === undefined){
            setErrors({...Errors,
                password: "password is required"});
                return false;
        }else if(formData.password.length < 3){
            setErrors({...Errors,
            password: "password is too short"});
            return false;
        }

        return true;
    }
 return(
    <VStack marginTop={20}>                  

    <LinearGradient
            start={{x: 0.0, y: 0.50}}
            end={{x: 1, y: 4}}
            locations={[0, 0.4]}
            colors={['white', '#1C82AD']}
            style={styles.linearGradient}>
        <Text fontSize="3xl" bold textAlign="center">Log in</Text>

        <Divider style={{ height:1.5, color:'white'}}/>
        
        <Box w="100%" marginBottom={30}>
        <Box w="100%">
           <FormControl isRequired isInvalid={'username' in Errors} >
                <Stack mx="4">
                   <FormControl.Label>Username:</FormControl.Label>
                   <Input  type="text" placeholder="your name" variant="rounded" value={formData.username} onChangeText={text => setFormData({username:text,email:formData.email,password:formData.password})}
                   focusOutlineColor="blue" invalidOutlineColor="red" borderColor="black" />
                   {'username' in Errors ? 
                   (<FormControl.ErrorMessage>{Errors["username"]}</FormControl.ErrorMessage>):(
                    <FormControl.HelperText>must be atleast 3 characters</FormControl.HelperText>

                   )                   
                }
                </Stack>
           </FormControl>
        </Box>
        <Box w="100%">
           <FormControl isRequired isInvalid={'email' in Errors}>
                <Stack mx="4">
                   <FormControl.Label tintColor="#8b5cf6">Email:</FormControl.Label>
                   <Input type="email" placeholder="email@gmail.com" variant="rounded" value={formData.email} onChangeText={text => setFormData({username:formData.username,email:text,password:formData.password})}
                        focusOutlineColor="blue" invalidOutlineColor="red" borderColor="black"                 />
                  {'email' in Errors ? 
                   (<FormControl.ErrorMessage>{Errors["email"]}</FormControl.ErrorMessage>):(
                    <FormControl.HelperText>must be atleast 3 characters</FormControl.HelperText>

                   )                   
                }
                </Stack>
           </FormControl>
        </Box>
        <Box w="100%">
           <FormControl isRequired isInvalid={'password' in Errors}>
                <Stack mx="4">
                   <FormControl.Label color="#8b5cf6"  >Password:</FormControl.Label>
                   <Input type="password" placeholder="123445/k" variant="rounded" value={formData.password} onChangeText={text => setFormData({username:formData.username,email:formData.email,password:text})}
                   focusOutlineColor="blue" invalidOutlineColor="red" borderColor="black" />
                   {'password' in Errors ? 
                   (<FormControl.ErrorMessage>{Errors["password"]}</FormControl.ErrorMessage>):(
                    <FormControl.HelperText>must be atleast 3 characters</FormControl.HelperText>

                   )                   
                }
                </Stack>
           </FormControl>
        </Box>
        <Box w="100%" alignItems="center" marginTop={5} >
         <Button onPress={submitHandler}  title="Log In" style={{width:width/2}} mode='elevated' textColor='white' buttonColor="#1C82AD"
           >LOG IN</Button>  
               
         <View style={{flexDirection:'row', marginTop:20 }}>
          <Text >Don't have an account ?</Text>
          <TouchableOpacity>
            <Text color="#1C82AD" bold>Register</Text>
          </TouchableOpacity>
        </View>
        </Box>
        </Box>
      
  </LinearGradient>
    
  </VStack>
 )
}
const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 10,
        paddingRight: 10,       
        marginTop: 16,
        width:width,
        borderRadius:20,
      },
})

export default Signin;