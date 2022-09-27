import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import theme from '../common/theme';

const CustomButton = ({text, onPressEvent}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.getstartedbutton}
      onPress={onPressEvent}>
      <Image
        source={require('../assets/images/buttonbackgroundorange.png')}
        style={styles.buttonimage}
      />
      <View style={styles.view}>
        <Text style={styles.textstyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  getstartedbutton: {
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    position: 'relative',
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  buttonimage: {
    padding: 10,
    margin: 0,
    height: 60,
    width: '100%',
    resizeMode: 'stretch',
  },
  textstyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: theme.fontBold,
  },
});

export default CustomButton;
