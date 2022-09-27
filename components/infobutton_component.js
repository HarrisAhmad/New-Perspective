import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const InfoButton = props => {
  return (
    <TouchableOpacity
      style={{
        flex: props.flexRange,
        paddingTop: props.padding == null ? 9 : props.padding,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
      }}
      onPress={() => props.onPressEvent()}>
      <Image
        source={require('../assets/images/infobutton.png')}
        style={styles.infoImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 0.29,
    paddingTop: 9,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  infoImage: {
    top: 5,
    width: '100%',
    height: 20,
    resizeMode: 'contain',
    padding: 15,
  },
});

export default InfoButton;
