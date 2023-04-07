import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Buttons = ({ label, apple,google }) => {
  return (
    <View>
      <View style={{ ...styles.signUp }}>
        {apple&&<Image source={require('../../assets/images/apple.png')} style={{marginRight:5}}/> }
        {google&& <Image source={require('../../assets/images/google.png')} style={{marginRight:5}}/>}
        <Text
          style={{
            fontWeight: '700',
            color: '#000',
            fontFamily: 'MontSBold',
            fontSize: 24,
           
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export default Buttons;
const styles = StyleSheet.create({
  signUp: {
    flexDirection:'row',
    // justifyContent:'center',
    backgroundColor: '#fff',
    height: 48,
    borderRadius: 25,
    width:'80%',
    // paddingLeft:49,
    alignItems: 'center',
    paddingHorizontal:20,
    marginVertical:10
  },
});
