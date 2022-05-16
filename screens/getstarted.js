import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import CustomButton from '../components/custombutton';

const GetStartedScreen = props => {
  const [width, setLayout] = useState(0);
  const [images, setImages] = useState([
    // 'https://source.unsplash.com/1024x768/?nature',
    // 'https://source.unsplash.com/1024x768/?water',
    // 'https://source.unsplash.com/1024x768/?girl',
    // 'https://source.unsplash.com/1024x768/?tree', // Network image
    require('../assets/images/slide-1.png'),
    require('../assets/images/slide-2.png'),
    require('../assets/images/slide-3.png'),
  ]); // Local image])

  onLayout = e => {
    setLayout(e.nativeEvent.layout.width);
  };

  const switchScreen = mode => {
    if (mode == 0) {
      props.navigation.navigate('User Info');
    }
    if (mode == 1) {
      props.navigation.navigate('Sign up');
    }
  };

  return (
    <>
      <View style={styles.slider}>
        <SliderBox
          images={images}
          sliderBoxHeight={'100%'}
          onLayout={onLayout}
          parentWidth={width}
          dotColor="#57BCB6"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: 'absolute',
            bottom: 0,
            padding: 0,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 15,
            marginHorizontal: 10,
            padding: 0,
            margin: 0,
          }}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/npLogoText.png')}
          style={{
            width: '100%',
            height: 50,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.buttoncontainer}>
        <View style={styles.custombuttoncontainer}>
          <CustomButton
            text="GET A QUOTE"
            onPressEvent={() => switchScreen(0)}
          />
        </View>
        {/* <View style={styles.loginbuttoncontainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.loginbutton}
            onPress={() => switchScreen(1)}>
            <Text style={styles.loginTextColor}>LOG IN</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    paddingHorizontal: 45,
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    height: 50,
    top: 30,
    padding: 3,
  },
  buttoncontainer: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'space-around',
    flexDirection: 'row',
    bottom: 45,
  },
  custombuttoncontainer: {
    flex: 0.8,
    paddingTop: 10,
  },
  loginbuttoncontainer: {
    flex: 0.43,
    paddingTop: 10,
    top: 2,
  },
  loginbutton: {
    flex: 0.7,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    // shadowColor: '#000000',
    elevation: 10,
    position: 'relative',
    // shadowOffset: {width: 0, height: 5},
    // shadowRadius: 5,
    // shadowOpacity: 0.35,
    backgroundColor: '#F9F7F7',
  },
  loginTextColor: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#eda640',
  },
});

export default GetStartedScreen;
