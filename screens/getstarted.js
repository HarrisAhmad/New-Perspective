import * as React from 'react';
import {useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
//import {SliderBox} from 'react-native-image-slider-box';
import AppIntroSlider from 'react-native-app-intro-slider';
import {SaveAsyncStorage} from '../common/commonstoragefunc';
import theme from '../common/theme';
import CustomButton from '../components/custombutton';

const GetStartedScreen = props => {
  const [width, setLayout] = useState(0);
  const [images, setImages] = useState([
    require('../assets/images/slide-1.png'),
    require('../assets/images/slide-2.png'),
    require('../assets/images/slide-3.png'),
  ]);

  const slides = [
    {
      key: 1,
      title: require('../assets/images/npLogoText.png'),
      text: 'Description.\nSay something cool',
      image: require('../assets/images/slide-1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../assets/images/slide-2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      image: require('../assets/images/slide-3.png'),
      backgroundColor: '#22bcb5',
    },
  ];

  const renderItem = item => {
    return (
      <View style={styles.slider}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={item.image}
        />
      </View>
    );
  };

  onLayout = e => {
    setLayout(e.nativeEvent.layout.width);
  };

  const switchScreen = async mode => {
    if (mode == 0) {
      props.navigation.navigate('User Info');
      //  await SaveAsyncStorage('UserLoggedIn', 'true'); test
    }
    if (mode == 1) {
      props.navigation.navigate('Signin');
    }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <AppIntroSlider
          data={slides}
          renderItem={({item}) => renderItem(item)}
          showDoneButton={false}
          showNextButton={false}
          //dotStyle={}
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
        <View style={styles.loginbuttoncontainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.loginbutton}
            onPress={() => switchScreen(1)}>
            <Text style={styles.loginTextColor}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.custombuttoncontainer}>
          <CustomButton text="LOG IN" onPressEvent={() => switchScreen(1)} />
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    bottom: 45,
  },
  custombuttoncontainer: {
    flex: 0.45,
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
    elevation: 10,
    position: 'relative',
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
