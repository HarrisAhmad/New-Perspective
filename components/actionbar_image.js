import React from 'react';
import {View, Image, Platform} from 'react-native';

const ActionBarImage = () => {
  return (
    <Image
      source={require('../assets/images/logo.png')}
      style={{
        flex: 0.5,
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        left: 55,
        right: 0,
        bottom: 0,
        width: Platform.OS == 'android' ? '145%' : '100%',
        height: 45,
        resizeMode: 'contain',
      }}
    />
  );
};

export default ActionBarImage;
