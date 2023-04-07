
import { Image, StyleSheet, Text,FlatList, View , TouchableOpacity} from 'react-native'
import {useState,useEffect,useContext} from 'react'
import { Ionicons,AntDesign,EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act } from 'react-dom/test-utils';

import VerifyModal from '../../components/modals/verifyModal';
import { AuthContext } from '../../config/AuthContext';

type Props = {
    navigation: any;
    testproduct:any
  };

  type Item = {
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
  }
const InventoryScreen = ({ testproduct,navigation }: Props) => {
  const { logout,authState } = useContext(AuthContext);
    const [visible, setvisible] = useState<boolean>(false);
    const [products, setProducts] = useState<Item[]>(testproduct);
    console.log(authState.isLoggedIn,'Home');
  
    useEffect(() => {
      if (!authState.isLoggedIn) {
        setvisible(false);
        navigation.navigate('Login');
      
      }
    }, [authState.isLoggedIn, navigation]);
  
    const handleLogout = () => {
      logout();
      setvisible(false);
    };

  const move =()=>{
    navigation.navigate('Addf')
  }


  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('items');
      const items = value != null ? JSON.parse(value) : [];
      act(() => {
        setProducts(items);
      });
    }
    
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 2000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <View>
        <VerifyModal visible={visible} children={undefined} testID={undefined}>
        <View style={{ alignItems: 'center' }}>
          {/* <Image source={require('../../../assets/images/signoutIcon.png')} /> */}
          <Text style={[styles.signOutText, { fontSize: 24, fontFamily: 'MontBold' }]}>
            Logout
          </Text>
          <Text style={styles.question}>Are you sure you want to Logout</Text>

          <TouchableOpacity onPress={handleLogout} style={styles.signUpactivity} >
            <Text style={styles.confirmText}>Logout</Text>
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
        <View style={{marginBottom:150}}>
        <FlatList
      data={products}
      renderItem={({item})=>(
        <TouchableOpacity  testID={item.name} onPress={() => navigation.navigate('Edit', { itemName: item.name })} style={styles.itemContainer}>
            <Image source={{uri:item.imageUrl }} style={styles.image}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,backgroundColor:'grey'}}>
            <Text>Name: {item.name}</Text>
            <Text>${item.price}</Text>
            
                </View>
                <Text style={{backgroundColor:'grey'}}>Total: {item.stock}</Text>
        
        </TouchableOpacity>
      )}
      numColumns={2}
      />

      <View style={{flexDirection:'row',justifyContent:'space-evenly' }}>
      <TouchableOpacity  onPress={move} style={{justifyContent:'center',alignItems:'center'}}>
        <Ionicons name="add-circle-sharp" size={50} color="black" />
       <Text>Add New item</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Edit')} style={{justifyContent:'center',alignItems:'center'}}>
        <EvilIcons name="pencil" size={50} color="black" />
       <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setvisible(true)} style={{justifyContent:'center',alignItems:'center'}}>
        <AntDesign name="logout" size={40} color="red" />
       <Text>Log out</Text>
        </TouchableOpacity>
      </View>
      
            </View>

        
    
    </View>
   
  )
}

export default InventoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        width:'100%',
        aspectRatio:1
      },
      itemContainer:{
        width:'50%',
        padding:5
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


