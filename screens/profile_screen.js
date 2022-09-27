import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {connect} from 'react-redux';

import {CheckInternetConnectivity} from '../common/commonfunctions';
import {useDrawerStatus} from '@react-navigation/drawer';
import InfoButton from '../components/infobutton_component';
import {
  SHOW_SIGNATUREMODAL,
  SHOW_INFOMODAL,
  USER_NAME,
} from '../store/actiontypes';
import PolicyInfoModal from '../components/poliicyinfomodal';
import CustomButton from '../components/custombutton';
// import CustomSnackBar from '../components/customsnackbar';
import LoadingIndicator from '../components/loadingindicator_component';
import {GetAsyncStorageData} from '../common/commonstoragefunc';
import {GetApplicationStatus, GetDependants} from '../services/apiservice';
import CommonStyles from '../common/commonstyles';
import BackPressHandler from '../components/backpresshandler';
import theme from '../common/theme';
import CustomFinishButton from '../components/customfinishbutton';
import {DiscContentEnding} from '../common/textcontent';

const ProfileScreen = props => {
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState('');
  const [discText, setDiscText] = useState(DiscContentEnding);
  const [isPrimarySelected, setPrimarySelected] = useState(false);
  const [isHospitalSelected, setHospitalSelected] = useState(false);
  const [isUserSignedIn, setUserSignedIn] = useState('');

  const UP_ID = useRef(null);
  const PI_ID = useRef(null);
  const C_ID = useRef(null);
  const isFicaAdded = useRef(null);
  const isBeneficiaryAdded = useRef(null);
  const isSignatureuploaded = useRef(null);
  const isDocsAdded = useRef(null);
  const isDepandantAdded = useRef(null);
  const isPaymentAdded = useRef(null);
  const isHavingDependant = useRef(0);
  const policyMode = useRef(null);

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getPI_ID();
    getStorageData();
  }, []);

  const backHandler = () => {
    // alert('Hello');
  };

  const getPI_ID = async () => {
    setisLoading(true);
    UP_ID.current = await GetAsyncStorageData('UP_ID');
    PI_ID.current = await GetAsyncStorageData('PI_ID');
    const userStatus = await GetAsyncStorageData('UserLoggedIn');
    setUserSignedIn(userStatus);
    console.log(userStatus);
    const data = {
      PI_ID: PI_ID.current,
    };
    GetApplicationStatus(data).then(response => {
      if (response.P_Name == 'Combined') {
        setHospitalSelected(true);
        setPrimarySelected(true);
      } else if (response.P_Name == 'Primary Health Care Plan') {
        setPrimarySelected(true);
      } else if (response.P_Name == 'Hospital Plan C') {
        setHospitalSelected(true);
      }
      setName(response.PI_Name + ' ' + response.PI_Surname);
      props.getUserName(response.PI_Name, response.PI_Surname);
      setStatus(
        response.S_Status == null ? 'Not Completed' : response.S_Status,
      );
      setisLoading(false);
    });
  };

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  const getStorageData = async () => {
    const data = {
      UP_ID_FK: UP_ID.current,
      isDependantAdded: 0,
    };
    GetDependants(data).then(response => {
      isHavingDependant.current = response.length;
    });
    C_ID.current = await GetAsyncStorageData('C_ID');
    isDepandantAdded.current = await GetAsyncStorageData('isDependantAdded');
    isPaymentAdded.current = await GetAsyncStorageData('isPaymentAdded');
    isFicaAdded.current = await GetAsyncStorageData('isFicaAdded');
    isBeneficiaryAdded.current = await GetAsyncStorageData(
      'isBeneficiaryAdded',
    );
    isSignatureuploaded.current = await GetAsyncStorageData(
      'isSignatureuploaded',
    );
    isDocsAdded.current = await GetAsyncStorageData('isDocsFileAdded');
  };

  const getPackageInfo = index => {
    policyMode.current = index;
    props.modalShown(true);
  };

  const navHandler = () => {
    if (C_ID.current == null) {
      return 'ContactDetails Form';
    }
    if (C_ID.current != null && isDepandantAdded.current == null) {
      return 'Dependant Screen';
    }
    if (
      C_ID.current != null &&
      isDepandantAdded.current != null &&
      isPaymentAdded.current == null
    ) {
      return 'Payment Details';
    }
    if (
      C_ID.current != null &&
      isDepandantAdded.current != null &&
      isPaymentAdded.current != null &&
      isFicaAdded.current == null
    ) {
      return 'Fica Questionnaire';
    }

    if (
      C_ID.current != null &&
      isDepandantAdded.current != null &&
      isPaymentAdded.current != null &&
      isFicaAdded.current != null &&
      isBeneficiaryAdded.current == null
    ) {
      return 'Beneficiary Nomination';
    }
    if (
      C_ID.current != null &&
      isDepandantAdded.current != null &&
      isPaymentAdded.current != null &&
      isFicaAdded.current != null &&
      isBeneficiaryAdded.current != null &&
      isSignatureuploaded.current == null
    ) {
      props.signaturemodalShown(true);
    }

    if (
      C_ID.current != null &&
      isDepandantAdded.current != null &&
      isPaymentAdded.current != null &&
      isFicaAdded.current != null &&
      isBeneficiaryAdded.current != null &&
      isSignatureuploaded.current != null
    ) {
      return 'Docs Required';
    }
  };

  const buttonHandler = () => {
    if (UP_ID.current == null) {
      return (
        <View style={styles.buttoncontainer}>
          <View style={styles.loginbuttoncontainer}>
            <CustomFinishButton
              text="GET A QUOTE"
              onPressEvent={() => props.navigation.navigate('User Info')}
            />
          </View>
        </View>
      );
    }
    if (UP_ID.current != null && C_ID.current == null) {
      return (
        <View style={styles.buttoncontainer}>
          <CustomButton
            text=" GET A NEW QUOTE"
            onPressEvent={() => props.navigation.navigate('User Info')}
          />
          <View style={styles.loginbuttoncontainer}>
            <CustomFinishButton
              text="COMPLETE YOUR APPLICATION"
              onPressEvent={() => props.navigation.navigate(navHandler())}
            />
          </View>
        </View>
      );
    }
    if (
      UP_ID.current != null &&
      C_ID.current != null &&
      isDocsAdded.current == null
    ) {
      return (
        <View style={styles.buttoncontainer}>
          <View style={styles.loginbuttoncontainer}>
            <CustomFinishButton
              text="COMPLETE YOUR APPLICATION"
              onPressEvent={() => props.navigation.navigate(navHandler())}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/greenbgs.png')}>
      {isLoading == true ? <LoadingIndicator /> : null}
      {props.modalPopup.isModalVisible == true ? (
        <PolicyInfoModal
          navigation={props.navigation}
          policyMode={policyMode.current}
        />
      ) : null}

      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      {isLoading == false ? (
        <View style={styles.container}>
          {/* <View style={styles.settingContainer}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Drawer', {screen: 'Signin'})
              }>
              <Image
                style={styles.accountImage}
                source={require('../assets/images/accounticon.png')}
              />
            </TouchableOpacity>
          </View> */}
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
              <Text style={styles.statusTextStyle}>{status}</Text>
            </View>
          </View>
          <View style={styles.scrollContainer}>
            <Text style={[CommonStyles.subheaderleft, {paddingLeft: 5}]}>
              Policy Plan:
            </Text>
            {isPrimarySelected ? (
              <View style={styles.rowstyle}>
                <Text style={CommonStyles.subheaderleft}>Primary Care</Text>
                <InfoButton
                  onPressEvent={() => getPackageInfo(0)}
                  flexRange={0.6}
                  padding={0.5}
                />
              </View>
            ) : null}
            {isHospitalSelected ? (
              <View style={styles.rowstyle}>
                <Text style={CommonStyles.subheaderleft}>Hospital Care</Text>

                <InfoButton
                  onPressEvent={() => getPackageInfo(1)}
                  flexRange={0.6}
                  padding={0.5}
                />
              </View>
            ) : null}
          </View>
          {/* <View style={styles.scrollContainer}>
            <Text style={CommonStyles.paracenter}>{discText}</Text>
          </View> */}

          <FAB
            icon="phone"
            color={theme.primary}
            style={styles.fab}
            onPress={() => dialCall()}
          />
          {buttonHandler()}
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
  settingContainer: {
    flex: 0.06,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  accountImage: {width: 40, height: 40, padding: 5, bottom: 0, left: 2},
  statusTextStyle: {
    padding: 5,
    textAlign: 'center',
    fontSize: 35,
    color: '#EDA640',
    fontWeight: 'bold',
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
  rowstyle: {
    flex: 0.2,
    padding: 5,
    flexDirection: 'row',
  },
  infocontainer: {
    flex: 0.3,
    marginTop: 10,
    borderWidth: 2,
    borderLeftWidth: 4,
    borderColor: '#EDA640',
    borderRadius: 5,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
  },
  buttoncontainer: {
    flex: 0.27,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginBottom: 5,
    padding: 5,
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
  scrollContainer: {
    flex: 0.5,
    alignContent: 'center',
  },
  loginTextColor: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a95b8',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    backgroundColor: theme.secondary,
    right: 0,
    bottom: 10,
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
    signaturemodalShown: isSignatureModalVisible => {
      dispatch({
        type: SHOW_SIGNATUREMODAL,
        payload: {
          isSignatureModalVisible,
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
