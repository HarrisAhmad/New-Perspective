import React, {useState, useEffect, useRef} from 'react';
import {Paragraph} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import CustomFinishButton from '../components/customfinishbutton';
import CommonStyles from '../common/commonstyles';
import BackPressHandler from '../components/backpresshandler';
import {AppProcessed} from '../common/textcontent';

const ApplicationProcessed = props => {
  const [buttonText, setText] = useState('Finish');

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
  }, []);

  const backHandler = () => {
    // alert('Hello');
  };

  const finishApp = () => {
    props.navigation.dispatch(StackActions.replace('Proflie Screen'));
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/greenbgs.png')}>
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>WOOHOO!</Text>
          </View>
        </View>
        <ScrollView
          style={styles.infocontainer}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}>
          <Paragraph style={styles.infotext}>{AppProcessed()}</Paragraph>

          <Image
            source={require('../assets/images/UnityHealth_Logo.png')}
            style={styles.bottomlogoImage}
          />
          <Image
            source={require('../assets/images/Constantia_logo.png')}
            style={styles.bottomlogoImage}
          />
        </ScrollView>

        <View style={styles.buttoncontainer}>
          <View style={styles.custombutton}>
            <CustomFinishButton
              text={buttonText}
              onPressEvent={() => finishApp()}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: 0.1,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  custombutton: {
    marginBottom: 1,
    flex: 1,
    padding: 5,
    flexDirection: 'column',
  },
  infocontainer: {
    flex: 1,
  },
  infotext: {
    fontSize: 18,
    padding: 10,
    color: '#000000',
  },
  bottomlogoImage: {
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    height: 55,
    resizeMode: 'contain',
    bottom: 15,
  },
  buttoncontainer: {
    flex: 0.1,
    padding: 5,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo};
};
const mapDispatchToProps = dispatch => {
  return {
    getUserName: (userName, surName) => {
      dispatch({
        type: USER_NAME,
        payload: {
          userName,
          surName,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(ApplicationProcessed);
