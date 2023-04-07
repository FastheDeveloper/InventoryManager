import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';


interface AuthContextType {
    authState: AuthState;
    login: (email: string, password: string) => void;
    logout: () => void;
  }

interface Item {
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
  }

  interface AuthState {
    isLoggedIn: boolean;
    email: string;
    items: Item[];
  }
  
  export const AuthContext = createContext<AuthContextType>({
    authState: { isLoggedIn: false, email: '', items: [] },
    login: () => {},
    logout: () => {},
  });


const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    email: '',
    items: [],
  });

  useEffect(() => {
    // check if the user is already logged in
    const checkLogin = async () => {
      const email = await AsyncStorage.getItem('isLoggedIn');
      const itemsString = await AsyncStorage.getItem('items');

      if (email && email !== 'false'  && itemsString) {
        const items: Item[] = JSON.parse(itemsString);
        setAuthState({
          isLoggedIn: true,
          email,
          items,
        });
      }else {
    setAuthState({
      isLoggedIn: false,
      email: '',
      items: [],
    });
  }
    };

    checkLogin();
  }, []);

  const login = async (email: string, password: string) => {
    // check if email and password are valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error','Sign in with an email');
      return;
    }
      let items: Item[] = [];
  
      // check if the user email already exists in AsyncStorage
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail === email) {
        // user email already exists, only get the items from AsyncStorage
        await AsyncStorage.setItem('isLoggedIn', 'true');
        const itemsString = await AsyncStorage.getItem('items');
        items = itemsString ? JSON.parse(itemsString) : [];
      } else {
        // user email doesn't exist, create new items and store in AsyncStorage
        items = [
          {
            name: 'Item 1',
            price: 10,
            stock: 100,
            description: 'Description of item 1',
            imageUrl: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png',
          },
          {
            name: 'Item 2',
            price: 20,
            stock: 50,
            description: 'Description of item 2',
            imageUrl: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png',
          },
          {
            name: 'Item 3',
            price: 30,
            stock: 25,
            description: 'Description of item 3',
            imageUrl: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png',
          },
          {
            name: 'Item 4',
            price: 15,
            stock: 75,
            description: 'Description of item 4',
            imageUrl: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png',
          },
          {
            name: 'Item 5',
            price: 25,
            stock: 10,
            description: 'Description of item 5',
            imageUrl: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png',
          },
        ];
        await AsyncStorage.setItem('items', JSON.stringify(items));
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('isLoggedIn', 'true');

      }
  
      // update the AuthContext state with the user email and set isLoggedIn to true
      setAuthState({
        isLoggedIn: true,
        email: email,
        items: items,
      });
    
  };
  

  const logout = async() => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    setAuthState({
        isLoggedIn: false,
        email: '',
        items: [],
      });
  };

  

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
function setAuthState(arg0: { isLoggedIn: boolean; email: string; items: any; }) {
    throw new Error('Function not implemented.');
}

