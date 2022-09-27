import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const CustomFinishButton = ({text, onPressEvent}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.getstartedbutton}
      onPress={onPressEvent}>
      <Image
        source={require('../assets/images/buttonbackgroundgreen.png')}
        style={styles.buttonimage}
      />
      <View style={styles.view}>
        <Text style={styles.textstyle}>{text}</Text>
      </View>
    </TouchableOpacity>

    // <TouchableOpacity
    //   activeOpacity={0.9}
    //   style={styles.getstartedbutton}
    //   onPress={onPressEvent}>
    //   <View style={styles.view}>
    //     <Text style={CommonStyles.buttontextstyle}>{text}</Text>
    //   </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  getstartedbutton: {
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000000',
    elevation: 10,
    position: 'relative',
    // shadowOffset: {width: 0, height: 5},
    // shadowRadius: 10,
    // shadowOpacity: 0.35,
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
  },
});

export default CustomFinishButton;
