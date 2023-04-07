
import {  StyleSheet, Text, View ,Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React,{useState} from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AntDesign } from '@expo/vector-icons';
import CustomInput from '../../components/inputs/AuthInput';
import MButtons from '../../components/MainButtons/Button';
import VerifyModal from '../../components/modals/verifyModal';

import { deleteByName, editByName } from '../../config/userFunctions';

const statusBarHeight = getStatusBarHeight();
const { width, height } = Dimensions.get('window');

type Props = {
    navigation: any;
    route:any;
  };

const Edit = ({ navigation,route }: Props,) => {
  const { itemName } = route?.params ?? {};
    const [name, setName] = useState<string>(itemName !== undefined ? itemName : '');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [desc, setDesc] = useState<string>('');
    const [visible, setvisible] = useState<boolean>(false);
    
  

  const disableit=!name||!price||!stock||!desc
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <VerifyModal visible={visible} children={undefined} testID="verify-modal">
        <View style={{ alignItems: 'center' }}>
          {/* <Image source={require('../../../assets/images/signoutIcon.png')} /> */}
          <Text style={[styles.signOutText, { fontSize: 24, fontFamily: 'MontBold' }]}>
            Delete Item
          </Text>
          <Text style={styles.question}>Are you sure you want to Delete Item</Text>

          <TouchableOpacity style={styles.signUpactivity} onPress={() => deleteByName(name, navigation)}>
            <Text style={styles.confirmText}>Delete Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setvisible(false)}
            style={[
              styles.signUpactivity,
              { borderColor: '#054B99', backgroundColor: '#fff', borderWidth: 1 },
            ]}
          >
            <Text style={[styles.confirmText, { color: '#054B99' }]}>No</Text>
          </TouchableOpacity>
        </View>
      </VerifyModal>
    <View style={styles.innerContainer}>
    <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <AntDesign name="left" size={28} color="black" onPress={()=>navigation.goBack()}/>
        <Text style={{fontSize:30,fontFamily:'PoppinsBold'}}>Edit</Text>
        <Text>{'                  '}</Text>
    </View>
    {disableit&& 
    <Text style={{color:'red',textAlign:'center'}}>Please fill all fields. they are required</Text>
    }
    <View style={{marginTop:20}}>
    
    <CustomInput label={'Name'} value={name}   isEmail={undefined} onChangeText={(text: React.SetStateAction<string>) => setName(text)} isPassword={undefined} hidePassword={undefined} setHidePassword={undefined} isName={undefined}/>
    <CustomInput keyboardType='numeric' label={'Price'} isPassword={undefined} onChangeText={(text: React.SetStateAction<number>) => setPrice(text)} hidePassword={undefined} setHidePassword={undefined} isName={undefined} isEmail={undefined}/>
    <CustomInput keyboardType='numeric' label={'Total Stock'} isPassword={undefined} onChangeText={(text: React.SetStateAction<number>) => setStock(text)} hidePassword={undefined} setHidePassword={undefined} isName={undefined} isEmail={undefined}/>
    <CustomInput label={'Description'} isPassword={undefined} onChangeText={(text: React.SetStateAction<string>) => setDesc(text)} hidePassword={undefined} setHidePassword={undefined} isName={undefined} isEmail={undefined}/>
    
    </View>
    <View style={{alignItems:'center'}}>
    <TouchableOpacity disabled={disableit} onPress={()=> editByName(name, price, stock, desc, navigation)} >
    <MButtons label={'Edit item by name'} disabled={undefined}/>
    </TouchableOpacity>
    </View>

    <View style={{alignItems:'center'}} >
    <TouchableOpacity  onPress={()=>setvisible(true)}  >
    <MButtons label={'Delete by name'} disabled={true}/>
    </TouchableOpacity>
    </View>
   
      
    
    

    </View>
   
</KeyboardAvoidingView>
  )
}

export default Edit

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
     
      
    },
    signOutText: {
        color: '#ED2E7E',
        fontFamily: 'MontSBold',
        fontSize: 16,
      },
      question: {
        fontFamily: 'Montserat',
        textAlign: 'center',
        color: '#4E4B66',
      },
      signUpactivity: {
        backgroundColor: '#ED2E7E',
        height: 48,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      confirmText: {
        fontFamily: 'Montserat',
        color: '#fff',
        fontSize: 16,
      },
})