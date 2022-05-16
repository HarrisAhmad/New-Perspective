import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {CheckInternetConnectivity} from '../common/commonfunctions';
import PolicyInfoModal from '../components/poliicyinfomodal';
import CustomSnackBar from '../components/customsnackbar';
import {SHOW_INFOMODAL, SHOWHIDE_SNACKBAR} from '../store/actiontypes';
import {GetAsyncStorageData} from '../common/commonstoragefunc';
import {GetApplicationStatus} from '../services/apiservice';
import CommonStyles from '../common/commonstyles';
import BackPressHandler from '../components/backpresshandler';
import theme from '../common/theme';

const ProfileScreen = props => {
  const [buttonText, setText] = useState('Finish');
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState('');

  const UP_ID = useRef(null);

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getPI_ID();
  }, []);

  const backHandler = () => {
    // alert('Hello');
  };

  const getPI_ID = async () => {
    setisLoading(true);
    UP_ID.current = await GetAsyncStorageData('UP_ID');
    const data = {
      UP_ID: UP_ID.current,
    };
    GetApplicationStatus(data).then(response => {
      console.log(response);
      setName(response.PI_Name + ' ' + response.PI_Surname);
      setStatus(response.S_Status);
      setisLoading(false);
    });
  };

  const getPackageInfo = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        props.modalShown(true);
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/greenbgs.png')}>
      {isLoading == true ? (
        <View
          style={{
            flex: 0.5,
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : null}
      {props.modalPopup.isModalVisible == true ? (
        <PolicyInfoModal navigation={props.navigation} />
      ) : null}
      {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null}
      {isLoading == false ? (
        <View style={styles.container}>
          <View style={styles.headercontainer}>
            <View style={CommonStyles.subheadercenter}>
              <Text style={CommonStyles.header}>
                Hello{'\n'} {name}
              </Text>
            </View>
          </View>
          <View style={styles.infocontainer}>
            <Text style={CommonStyles.subheaderleft}>Policy Status</Text>
            <View style={CommonStyles.subheaderleft}>
              <Text
                style={{
                  padding: 5,
                  textAlign: 'center',
                  fontSize: 35,
                  color: '#EDA640',
                  fontWeight: 'bold',
                }}>
                {status}
              </Text>
            </View>
            {/* <Paragraph style={styles.infotext}>{AppProcessed()}</Paragraph> */}
          </View>
        </View>
      ) : null}
      {isLoading == false ? (
        <View style={styles.buttoncontainer}>
          <View style={styles.loginbuttoncontainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.loginbutton}
              onPress={() => getPackageInfo()}>
              <Text style={styles.loginTextColor}>PLAN INFORMATION</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: 0.18,
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

  header: {
    flex: 0.1,
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
    color: theme.textcolor,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 20,
    padding: 10,
    color: theme.textcolor,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  infocontainer: {
    flex: 0.3,
    borderWidth: 2,
    borderLeftWidth: 4,
    borderColor: '#EDA640',
    borderRadius: 5,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
  },

  infotext: {
    fontSize: 18,
    padding: 10,
    color: '#000000',
  },

  buttoncontainer: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginbuttoncontainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginbutton: {
    flex: 0.55,
    flexDirection: 'row',
    borderColor: '#5a95b8',
    borderRadius: 8,
    borderWidth: 2,
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
    color: '#5a95b8',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
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
    modalShown: isModalVisible => {
      dispatch({
        type: SHOW_INFOMODAL,
        payload: {
          isModalVisible,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(ProfileScreen);
