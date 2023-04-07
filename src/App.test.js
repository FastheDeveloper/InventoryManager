import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import Login from './screens/AuthScreens/Login';
import Edit from './screens/Main/Edit';
import AddItems from './screens/Main/AddItems';
import HomeScreen from './screens/Main/HomeScreen'
import InventoryScreen from './screens/Main/HomeScreen';
import { render, fireEvent } from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { addItem, editByName, deleteByName } from './config/userFunctions'

describe('Async storage CRUD operations', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test('should add an item to async storage', async () => {
    const name = 'Test item';
    const price = 10;
    const stock = 5;
    const desc = 'This is a test item';
    const imageUrl = 'https://test.com/image.jpg';

    await addItem(name, price, stock, desc, imageUrl, jest.fn(), jest.fn(), jest.fn(), jest.fn());

    const data = await AsyncStorage.getItem('items');
    const items = JSON.parse(data);

    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(expect.objectContaining({
      name: name,
      price: price,
      stock: stock,
      desc: desc,
      imageUrl: imageUrl
    }));
  });

  test('should update an item in async storage', async () => {
    const name = 'Test item';
    const price = 10;
    const stock = 5;
    const desc = 'This is a test item';
    const imageUrl = 'https://test.com/image.jpg';

    await addItem(name, price, stock, desc, imageUrl, jest.fn(), jest.fn(), jest.fn(), jest.fn());

    const newPrice = 20;
    const newStock = 10;
    const newDesc = 'This is an updated test item';

    await editByName(name, newPrice, newStock, newDesc, jest.fn());

    const data = await AsyncStorage.getItem('items');
    const items = JSON.parse(data);

    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(expect.objectContaining({
      name: name,
      price: newPrice,
      stock: newStock,
      desc: newDesc,
      imageUrl: imageUrl
    }));
  });

  test('should delete an item from async storage', async () => {
    const name = 'Test item';
    const price = 10;
    const stock = 5;
    const desc = 'This is a test item';
    const imageUrl = 'https://test.com/image.jpg';

    await addItem(name, price, stock, desc, imageUrl, jest.fn(), jest.fn(), jest.fn(), jest.fn());

    await deleteByName(name, jest.fn());

    const data = await AsyncStorage.getItem('items');
    const items = JSON.parse(data);

    expect(items).toHaveLength(0);
  });

  test('should get an item from async storage', async () => {
    const name = 'Test item';
    const price = 10;
    const stock = 5;
    const desc = 'This is a test item';
    const imageUrl = 'https://test.com/image.jpg';

    await addItem(name, price, stock, desc, imageUrl, jest.fn(), jest.fn(), jest.fn(), jest.fn());

    const data = await AsyncStorage.getItem('items');
    const items = JSON.parse(data);
    const item = items.find((item) => item.name === name);

    expect(item).toEqual(expect.objectContaining({
      name: name,
      price: price,
      stock: stock,
      desc: desc,
      imageUrl: imageUrl
    }));
  });
});




//confirmNavigation
describe('InventoryScreen', () => {
    const testproduct = [{name: 'Item 1', price: 10, stock: 5, imageUrl: 'https://example.com/item1.jpg'},];
    const navigation = {
      navigate: jest.fn(),
    };
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('Navigates successfully', () => {
      const { getByTestId } = render(
        <InventoryScreen testproduct={testproduct} navigation={navigation} />
      );
      const item1 = getByTestId('Item 1');
      fireEvent.press(item1);
      expect(navigation.navigate).toHaveBeenCalledWith('Edit', {
        itemName: 'Item 1',
      });
    });
  });
//confirmNavigation

//confirm popup
describe('Edit screen', () => {
  test('Confirmation Poppup Shown', () => {
    const navigation = {
      goBack: jest.fn(),
    };
    const route = {
      params: {
        itemName: 'Existing Item',
      },
    };

    const { getByText, getByTestId } = render(
      <Edit navigation={navigation} route={route} />
    );

    fireEvent.press(getByText('Delete by name'));

    const verifyModal = getByTestId('verify-modal');
    expect(verifyModal).toBeDefined();
  });
});
//confirm popup

//screenshots
describe('InventoryScreen', () => {
    
    it('Screenshot Inventory Home', () => {
      const tree = renderer.create(<InventoryScreen navigation={{ navigate: jest.fn() }} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    
  });


it('Screenshot Edit', () => {
    const tree = renderer.create(<Edit/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Screenshot Login', () => {
    const tree = renderer.create(<Login/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Screenshot AddItems', () => {
    const tree = renderer.create(<AddItems/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
//screenshots

afterAll(() => {
    jest.useRealTimers();
  });
  