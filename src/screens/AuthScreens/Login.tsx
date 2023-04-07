
import { Image, StyleSheet, Text, View ,Platform,Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import CustomInput from '../../components/inputs/AuthInput';
import MButtons from '../../components/MainButtons/Button';
import { AuthContext } from '../../config/AuthContext';

const statusBarHeight = getStatusBarHeight();
const { width, height } = Dimensions.get('window');
type Props = {
    navigation: any;
  };

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [passin, setPassin] = useState('')
  const { login,authState } = useContext(AuthContext);

  const handleLogin = () => {
    login(email, passin);
    
  }
  console.log(authState.isLoggedIn,'Login');
  useEffect(() => {

    if (authState.isLoggedIn===true) {
      navigation.navigate('Main');
    }
  }, [authState.isLoggedIn, navigation]);
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.innerContainer}>
    <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <Text>{'                  '}</Text>
        <Text style={{fontSize:30,fontFamily:'PoppinsBold'}}>Login</Text>
        <Text>{'                  '}</Text>
    </View>

    <View style={{marginTop:20}}>
    
    <CustomInput label={'Email'} isEmail={true} onChangeText={(text: React.SetStateAction<string>) => setEmail(text)} isPassword={undefined} hidePassword={undefined} setHidePassword={undefined} isName={undefined}/>
    <CustomInput label={'Password'} isPassword={true} onChangeText={(text: React.SetStateAction<string>) => setPassin(text)} hidePassword={undefined} setHidePassword={undefined} isName={undefined} isEmail={undefined}/>
    </View>
    <View style={{alignItems:'center'}}>
    <TouchableOpacity onPress={handleLogin} >
    <MButtons label={'login'} disabled={undefined}/>
    </TouchableOpacity>
    </View>
   
      
    
    

    </View>
   
</KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { 
      flex: 1,   
      backgroundColor: '#fff',
    },
    innerContainer:{
      backgroundColor:'#B9DCA8',
      paddingTop: statusBarHeight+30,
      paddingHorizontal:15,
      height:height*0.86,
      borderBottomLeftRadius:200,
      borderBottomRightRadius:200,
      
    },
    signinView:{
      backgroundColor:'#fff',
      padding:5
    },
    icons:{
      flexDirection:'row',
      marginTop:41
     
      
    }
})