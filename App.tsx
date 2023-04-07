import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/AuthScreens/Login';
import InventoryScreen from './src/screens/Main/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import AddItems from './src/screens/Main/AddItems';
import Edit from './src/screens/Main/Edit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import AuthContextProvider, { AuthContext } from './src/config/AuthContext';
import {useContext} from 'react'

const Stack = createStackNavigator();

export default function App() {
 
  const [fontsLoaded] = useFonts({
    PoppinsItalics: require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
  
    PoppinsLight: require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    Montserat: require('./assets/fonts/Montserat/Montserrat-Regular.ttf'),
    MontBold: require('././assets/fonts/Montserat/Montserrat-Bold.ttf'),
    MontEBold: require('././assets/fonts/Montserat/Montserrat-ExtraBold.ttf'),
    MontSBold: require('./assets/fonts/Montserat/Montserrat-SemiBold.ttf'),
  
  });
  
  if (!fontsLoaded) {
    return null;
  }
 
  
  // Call the checkLoggedIn function when the app starts
 


  return (
    <View style={styles.container}>
      <AuthContextProvider>
      <NavigationContainer>
      <Stack.Navigator
      // initialRouteName={hasUser?'Addf':'Login'}
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={InventoryScreen}/>
        <Stack.Screen name="Addf" component={AddItems}/>
        <Stack.Screen name="Edit" component={Edit}/>

      </Stack.Navigator>
    </NavigationContainer>
      <StatusBar style="auto" />
        </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
