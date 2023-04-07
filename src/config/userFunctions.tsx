
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert} from 'react-native'

export const editByName = async (name: any, price: number, stock: number, desc: any, navigation: { navigate: (arg0: string) => void; }) => {
    try {
      const data = await AsyncStorage.getItem('items');
      if (data !== null) {
        const items = JSON.parse(data);
        const index = items.findIndex((item: { name: any; }) => item.name === name);
        if (isNaN(price) || isNaN(stock)) {
          Alert.alert('Invalid input', 'Price and stock must be numbers.');
          return;
        }
        if (index !== -1) {
          items[index] = { ...items[index], name, price, stock, desc };
          await AsyncStorage.setItem('items', JSON.stringify(items));
          Alert.alert('Success', 'Item updated successfully');
          navigation.navigate('Main');
        } else {
          Alert.alert('Not found', `Item with name ${name} not found`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteByName = async (name: any, navigation: { navigate: (arg0: string) => void; }) => {
    try {
      const data = await AsyncStorage.getItem('items');
      if (data !== null) {
        const items = JSON.parse(data);
        const filteredItems = items.filter((item: { name: any; }) => item.name !== name);
        await AsyncStorage.setItem('items', JSON.stringify(filteredItems));
        Alert.alert('Success', 'Item deleted successfully');
        navigation.navigate('Main');
      } else {
        Alert.alert('Not found', `Item with name ${name} not found`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const addItem = async (name: any, price: number, stock: number, desc: string, imageUrl: any, setName: (arg0: string) => void, setPrice: (arg0: number) => void, setStock: (arg0: number) => void, setDesc: (arg0: string) => void, navigation: { navigate: (arg0: string) => void; }) => {
    try {
      // Get the existing items from local storage
      const items = await AsyncStorage.getItem('items');
      let itemsArray = [];
      if (items !== null) {
        itemsArray = JSON.parse(items);
      }
  
      // Check if the item name is unique
      const existingItem = itemsArray.find((item: { name: any; }) => item.name === name);
      if (existingItem) {
        Alert.alert('Duplicate Item', 'An item with the same name already exists.');
        return;
      }
      if (isNaN(price) || isNaN(stock)) {
        Alert.alert('Invalid input', 'Price and stock must be numbers.');
        return;
      }
  
      const descriptionWords = desc.split(' ');
      if (descriptionWords.length < 3) {
        Alert.alert('Error', 'Description must have at least 3 words.');
        return;
      }
  
      // Add the new item to the items array
      const newItem = { name, price, stock, desc, imageUrl };
      itemsArray.push(newItem);
  
      // Save the updated items array to local storage
      await AsyncStorage.setItem('items', JSON.stringify(itemsArray));
  
      // Reset the input fields
      setName('');
      setPrice(0);
      setStock(0);
      setDesc('');
  
      Alert.alert('Success', 'The item has been added to the inventory.');
      navigation.navigate('Main');
    } catch (error) {
      
      Alert.alert('Error', 'Failed to add the item to the inventory.');
    }
  };
  