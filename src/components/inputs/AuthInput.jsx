import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5,Ionicons,FontAwesome } from '@expo/vector-icons';

const CustomInput = ({
  label,
  isPassword,
  hidePassword,
  setHidePassword,
  isName,
  isEmail,

  ...props
}) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.textFeild}
      >
        <View style={styles.innerTextField}>
            {isName&&  <Ionicons name="person" size={24} color="black" style={{marginLeft:15}} />}
            {isEmail&&  <Ionicons name="mail" size={24} color="black" style={{marginLeft:15}} />}
            {isPassword&&  <FontAwesome name="lock" size={24} color="black" style={{marginLeft:15}}  />}

            <TextInput {...props} style={styles.input} placeholder={label} />
        </View>
       
       
        
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
  },
  label: {
    paddingBottom: 4,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
    color: '#14142B',
    fontFamily: 'Montserat',
  },
  textFeild: {
    backgroundColor: 'rgba(252, 252, 254, 0.5)',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 25,
    borderColor: '#CED4DA',
    paddingVertical: 12,
    justifyContent: 'center',
  },
  input: {
    fontSize: 17,
    width: '100%',
    marginLeft:10
  },
  eyecon: {
    position: 'absolute',
    right: 15,

    zIndex: 1,
  },
  innerTextField:{
    flexDirection:'row',
    alignItems:'center'
  }
});
