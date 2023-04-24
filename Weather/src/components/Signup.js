import React ,{ useState,useEffect} from "react";
import {View,StyleSheet,TouchableOpacity, Dimensions} from 'react-native'
import { Divider} from 'react-native-elements'
import { Button} from 'react-native-paper'
import {
    Text, VStack, Box, FormControl,Input,Stack
} from 'native-base'
import { useNavigate } from "react-router-dom";
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux'
import { registerUserAction } from "./Store/_actions";

const {height, width} = Dimensions.get('window')
const Signup = () => {
    const initValues ={username:'',email:'',password:'', confirmpassword:''}
    const [formData, setFormData] = useState(initValues)
    const [Errors, setErrors ]  = useState({})
    const [msg, setMsg ] = useState(null);
    const dispatch = useDispatch();
    const {user } = useSelector(state => state.user)
    
    // console.log('state', user.msg);
    const submitHandler = (e) => {
      e.preventDefault()
      if (Validate()){
        dispatch(registerUserAction(formData))
        // console.log('add');
        setMsg(user.msg)
      }
    //   setFormData(initValues);
    }
    const Validate = () => {
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
        }else if(!regex.test(formData.email)){
                setErrors({...Errors,
                email:'This email Not valid, try again !!'});
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
        if(formData.confirmpassword === undefined){
            setErrors({...Errors,
                confirmpassword: "confirmpassword is required"});
                return false;
        }else if(formData.confirmpassword.length < 3){
            setErrors({...Errors,
                confirmpassword: "confirmpassword is too short"});
            return false;
        }
        if(formData.password != formData.confirmpassword){
            setErrors({...Errors,
                confirmpassword: "The Passwords Does Not Match"});
            return false;
        }
        return true;
    }
 return(
    <VStack marginTop={5}>                  

    <LinearGradient
            start={{x: 0.0, y: 0.50}}
            end={{x: 1, y: 4}}
            locations={[0, 0.4]}
            colors={['white', '#1C82AD']}
            style={styles.linearGradient}>
        <Text fontSize="3xl" bold textAlign="center">Log in</Text>

        <Divider style={{ height:1.5, color:'white'}}/>
        {msg ? (
            <Box >
            <Text width="100%" textAlign="center" bold fontSize="2xl" color="green" size="30" >{msg ? msg:null}</Text>
            </Box>
        ):null}
       
        <Box w="100%" marginBottom={30}>
        <Box w="100%">
           <FormControl isRequired isInvalid={'username' in Errors} >
                <Stack mx="4">
                   <FormControl.Label>Username:</FormControl.Label>
                   <Input  type="text" placeholder="your name" variant="rounded" value={formData.username} onChangeText={text => setFormData({...formData,username:text})}
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
                   <Input type="email" placeholder="email@gmail.com" variant="rounded" value={formData.email} onChangeText={text => setFormData({...formData,email:text})}
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
                   <Input type="password" placeholder="123445/k" variant="rounded" value={formData.password} onChangeText={text => setFormData({...formData,password:text})}
                   focusOutlineColor="blue" invalidOutlineColor="red" borderColor="black" />
                   {'password' in Errors ? 
                   (<FormControl.ErrorMessage>{Errors["password"]}</FormControl.ErrorMessage>):(
                    <FormControl.HelperText>must be atleast 3 characters</FormControl.HelperText>

                   )                   
                }
                </Stack>
           </FormControl>
        </Box>
        <Box w="100%">
           <FormControl isRequired isInvalid={'password' in Errors}>
                <Stack mx="4">
                   <FormControl.Label color="#8b5cf6"  >Confirm Password:</FormControl.Label>
                   <Input type="password" placeholder="123445/k" variant="rounded" value={formData.confirmpassword} onChangeText={text => setFormData({...formData,confirmpassword:text})}
                   focusOutlineColor="blue" invalidOutlineColor="red" borderColor="black" />
                   {'confirmpassword' in Errors ? 
                   (<FormControl.ErrorMessage>{Errors["confirmpassword"]}</FormControl.ErrorMessage>):(
                    <FormControl.HelperText>must be atleast 3 characters</FormControl.HelperText>

                   )                   
                }
                </Stack>
           </FormControl>
        </Box>
        
        <Box w="100%" alignItems="center" marginTop={5} >
         <Button onPress={submitHandler}  title="Log In" style={{width:width/2}} mode='elevated' textColor='white' buttonColor="#1C82AD"
           >REGISTER</Button>  
               
         <View style={{flexDirection:'row', marginTop:20 }}>
          <Text >You have an account ?</Text>
          <TouchableOpacity>
            <Text color="#1C82AD" bold>Login</Text>
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


export default Signup;