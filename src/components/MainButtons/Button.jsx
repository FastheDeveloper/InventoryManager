import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const MButtons = ({ label, disabled }) => {
  return (
    <View>
      <View style={[styles.signUp,{backgroundColor:disabled?'pink':'rgba(69, 161, 24, 0.5)'}]}>
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

export default MButtons;
const styles = StyleSheet.create({
  signUp: {
  
    
    justifyContent:'center',
    height: 48,
    borderRadius: 25,
    paddingHorizontal:60,
    alignItems: 'center',
    marginVertical:10
  },
});
