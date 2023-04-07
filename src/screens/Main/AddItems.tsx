
import { Image, StyleSheet, Text, View ,Alert,Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React,{useState} from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AntDesign } from '@expo/vector-icons';

import CustomInput from '../../components/inputs/AuthInput';
import MButtons from '../../components/MainButtons/Button';
import { addItem } from '../../config/userFunctions';

const statusBarHeight = getStatusBarHeight();
const { width, height } = Dimensions.get('window');

type Props = {
    navigation: any;
  };

const AddItems = ({ navigation }: Props) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [desc, setDesc] = useState<string>('');
    const [imageUrl,setImageUrl]=useState('https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png')



  const disableit=!name||!price||!stock||!desc
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.innerContainer}>
    <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <AntDesign name="left" size={28} color="black" onPress={()=>navigation.goBack()}/>
        <Text style={{fontSize:30,fontFamily:'PoppinsBold'}}>Add New Item</Text>
        <Text>{'                  '}</Text>
    </View>
    {disableit&& 
    <Text style={{color:'red',textAlign:'center'}}>Please fill all fields. they are required</Text>
    
    }
    <View style={{marginTop:20}}>
    
    <CustomInput label={'Name'}  isEmail={undefined} onChangeText={(text: React.SetStateAction<string>) => setName(text)} isPassword={undefined} hidePassword={undefined} setHidePassword={undefined} isName={undefined}/>
    <CustomInput keyboardType='numeric' label={'Price'} isPassword={undefined} onChangeText={(text: React.SetStateAction<number>) => setPrice(text)} hidePassword={undefined} setHidePassword={undefined} isName={undefined} isEmail={undefined}/>
    <CustomInput keyboardType='numeric' label={'Total Stock'} isPassword={undefined} onChangeText={(text: React.SetStateAction<number>) => setStock(text)} hidePassword={undefined} setHidePassword={undefined} isName={undefined} isEmail={undefined}/>
    <CustomInput label={'Description'} isPassword={undefined} onChangeText={(text: React.SetStateAction<string>) => setDesc(text)} hidePassword={undefined} setHidePassword={undefined} isName={undefined} isEmail={undefined}/>
    
    </View>
    <View style={{alignItems:'center'}}>
    <TouchableOpacity disabled={disableit} onPress={() => addItem(name, price, stock, desc, imageUrl, setName, setPrice, setStock, setDesc, navigation)} >
    <MButtons label={'Add item'} disabled={undefined}/>
    </TouchableOpacity>
    </View>
    
    
    <View style={{alignItems:'center'}}>
    <TouchableOpacity onPress={()=>navigation.navigate('Edit')}  >
    <MButtons label={'Edit Inventory'} disabled={true}/>
    </TouchableOpacity>
    </View>
    
    

    </View>
   
</KeyboardAvoidingView>
  )
}

export default AddItems

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