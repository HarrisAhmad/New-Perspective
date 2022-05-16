import React, {useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import CommonStyles from '../common/commonstyles';
import {StyleSheet, View, Text, Image, Keyboard} from 'react-native';

const SignUp = props => {
  const regex = '^[0-9-+]{10,10}$';
  const [textInput, setTextInput] = useState('');

  validate = () => {
    if (textInput == '') {
      return <Text>Enter Phone Number </Text>;
    }
  };

  const switchScreens = () => {
    props.navigation.navigate('Verify OTP');
  };
  const setText = text => {
    setTextInput(text);
    if (textInput.length == 9) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <Image
          source={require('../assets/images/logobig.png')}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 100,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.headercontainer}>
        <View style={CommonStyles.subheadercenter}>
          <Text style={styles.headerStyle}>LOGIN</Text>
          <Text style={styles.subheadercenter}>Welcome Back!</Text>
        </View>
      </View>

      <View style={styles.regform}>
        <View style={styles.titleinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="Mobile Number"
            keyboardType={'number-pad'}
            value={textInput}
            placeholder={'067XXXXXXX'}
            theme={{
              colors: {
                primary: theme.textinputprimary,
                placeholder: theme.textinputplaceholder,
                text: theme.textinputtext,
              },
            }}
            onChangeText={text => setText(text)}
          />
          <HelperText
            type="error"
            visible={textInput != '' ? !textInput.match(regex) : null}>
            Phone Number is invalid!
          </HelperText>
        </View>
      </View>
      <View style={styles.buttoncontainer}>
        <View style={styles.custombutton}>
          <CustomButton text="VERIFY" onPressEvent={() => switchScreens()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: 0.3,
    marginVertical: 15,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  subheadercenter: {
    padding: 5,
    textAlign: 'center',
    fontSize: 18,
    color: theme.textcolor,
  },
  headerStyle: {
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 26,
    color: theme.textcolor,
    fontWeight: 'bold',
  },
  regform: {
    flex: 1,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
  titleinput: {
    flex: 0.25,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  inputstyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#35363A',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#404044',
  },
  checkboxcontainer: {
    flex: 0.5,
    justifyContent: 'space-around',
    bottom: 5,
    paddingBottom: 10,
  },
  buttoncontainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  custombutton: {
    marginBottom: 1,
    flex: 0.5,
    padding: 5,
    flexDirection: 'column',
  },
  checkboximage: {
    width: 30,
    height: 30,
    padding: 15,
    left: 2,
    // resizeMode: 'contain',
  },

  textstyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 17,
    padding: 1,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default SignUp;
