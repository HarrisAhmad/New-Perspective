import React, {useState, useEffect, createRef, useRef} from 'react';
import {Overlay} from 'react-native-elements';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {StackActions} from '@react-navigation/native';

import {
  Term,
  TermsCondition,
  Disclosure,
  DisclosureText,
} from '../common/textcontent';
import {AdjustPolicyDate} from '../services/apiservice';
import {GetAsyncStorageData} from '../common/commonstoragefunc';
import {SendDocs} from '../services/apiservice';
import theme from '../common/theme';
import CommonStyles from '../common/commonstyles';
import {connect} from 'react-redux';
import {SHOW_INFOMODAL, SHOW_SIGNATUREMODAL} from '../store/actiontypes';
import {CheckBox} from 'react-native-elements';
import SignatureCapture from 'react-native-signature-capture';
import {GetUserDate} from '../common/commonfunctions';
import AdjustDateModal from '../components/adjustdate_component';
import {getUP_ID} from '../common/commonstoragefunc';

const TermsModal = props => {
  const [visible, setVisible] = useState(true);
  const [header, setheader] = useState('');
  const [content, setContent] = useState('');
  const [checkTerms, setCheck] = useState(false);
  const [showTerms, setTerms] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [showDateDjuster, setDateAdjuster] = useState(true);

  const UP_ID = useRef('');
  const policyNumber = useRef(null);

  useEffect(() => {
    getID();
    checkState();
  }, []);

  const getID = async () => {
    UP_ID.current = await getUP_ID();
  };

  const currentDate = () => {
    console.log(props.userinfo.Adjusted_Date);
    if (props.userinfo.Adjusted_Date == '') {
      const date = new Date();
      return GetUserDate(date);
    } else {
      return GetUserDate(props.userinfo.Adjusted_Date);
    }
  };

  const checkState = async () => {
    if (props.state == 0) {
      setheader(Term);
      setContent(TermsCondition);
    }

    if (props.state == 1) {
      setheader(Disclosure);
      setContent(DisclosureText);
    }
    policyNumber.current = await GetAsyncStorageData('UserPolicy_Number');
  };
  const sign = createRef();

  const resetSign = () => {
    sign.current.resetImage();
  };

  const saveSign = () => {
    sign.current.saveImage();
  };

  const _onSaveEvent = async result => {
    setisLoading(true);
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    // alert('Signature Captured Successfully');
    const fileData = {
      name: 'NP_' + policyNumber.current + '_SIG',
      uri: Platform.OS == 'ios' ? result.pathName : 'file://' + result.pathName,
      type: 'image/png',
    };

    await SendDocs(fileData).then(result => {
      if (result != '') {
        // setTerms(true);
        props.signaturemodalShown(false);
        props.navigation.dispatch(StackActions.replace('Docs Required'));
        setisLoading(false);
      }
    });
  };

  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    //console.log('dragged');
  };

  const toggleOverlay = () => {
    props.signaturemodalShown(false);
  };
  const shiftModal = () => {
    setDateAdjuster(false);
  };

  const updatePolicyDate = async () => {
    const newDate = GetUserDate(props.userinfo.Adjusted_Date);

    const data = {
      UP_ID: UP_ID.current,
      StartDate: newDate,
    };

    AdjustPolicyDate(data);
    setDateAdjuster(false);
  };

  const toggleCondiitons = () => {
    if (checkTerms == true) {
      setCheck(false);
    } else {
      setCheck(true);
      setTerms(false);
      setDateAdjuster(false);
      // props.navigation.dispatch(StackActions.replace('Docs Required'));
      // toggleOverlay();
    }
  };

  const switchModalCondition = () => {
    if (showDateDjuster) {
      return (
        <AdjustDateModal
          getCurrentDate={() => currentDate()}
          skip={() => shiftModal()}
          updateDate={() => updatePolicyDate()}
        />
      );
    }

    if (!showDateDjuster && showTerms == true) {
      return (
        <ScrollView>
          <View style={styles.headerStyle}>
            <View style={CommonStyles.subheaderleft}>
              <Text style={CommonStyles.header}>TERMS AND CONDITIONS</Text>
            </View>
            <View style={{flex: 0.29, paddingTop: 5}}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImage}
              />
            </View>
          </View>
          <View style={styles.contentcontainer}>
            <View style={styles.contentstyle}>
              <Text style={CommonStyles.subheaderleft}>{content}</Text>
            </View>
          </View>

          <View style={styles.checkboxcontainer}>
            <TouchableOpacity>
              <CheckBox
                title="I agree to the terms and conditions"
                iconRight
                containerStyle={{
                  backgroundColor: '#66000000',
                  borderColor: '#66000000',
                }}
                textStyle={CommonStyles.textstyle}
                checkedIcon={
                  <Image
                    style={styles.checkboximage}
                    source={require('../assets/images/checkedbox.png')}
                  />
                }
                uncheckedIcon={
                  <Image
                    style={styles.checkboximage}
                    source={require('../assets/images/uncheckedbox.png')}
                  />
                }
                checked={checkTerms}
                onPress={() => toggleCondiitons()}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    if (!showDateDjuster && !showTerms) {
      return (
        <>
          <View style={styles.headerStyle}>
            <View style={CommonStyles.subheadercenter}>
              <Text style={CommonStyles.header}>ALMOST THERE</Text>
            </View>
            <View
              style={{
                flex: 0.3,
                paddingTop: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImage}
              />
            </View>
          </View>
          <View style={styles.contentstyle}>
            <Text style={CommonStyles.paracenter}>
              I declare that the contents of the form are ture, correct and
              complete.I have read the terms and conditions and I accept the
              contents thereof.
            </Text>
            <Text
              style={{
                padding: 5,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Please sign below
            </Text>
          </View>

          <SignatureCapture
            style={styles.signaturecontainer}
            ref={sign}
            saveImageFileInExtStorage={Platform.OS == 'android' ? true : false}
            // backgroundColor="#ff00ff"
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'portrait'}
          />
          <View
            style={{
              flexDirection: 'row',
              flex: 0.1,
              paddingHorizontal: 5,
              justifyContent: 'space-between',
            }}>
            <TouchableHighlight
              style={styles.buttonStyle}
              onPress={() => {
                saveSign();
              }}>
              <Text style={styles.textstylelogin}> SAVE</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonStyle}
              onPress={() => {
                resetSign();
              }}>
              <Text style={styles.textstylelogin}>RESET</Text>
            </TouchableHighlight>
          </View>
        </>
      );
    }
  };

  return (
    <View>
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
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.container}>
        {switchModalCondition()}
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    flexDirection: 'column',
    padding: 2,
    width: '95%',
    backgroundColor: '#ffffff',
  },
  headerStyle: {
    flex: 0.15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoImage: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    padding: 20,
  },
  contentcontainer: {flex: 1, justifyContent: 'center'},
  signaturecontainer: {
    flex: 0.8,
    borderColor: 'red',
    borderWidth: 1,
  },
  contentstyle: {
    flex: 0.5,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

  buttoncontainerstyle: {
    flex: 0.5,
    flexDirection: 'column',
    padding: 5,
    marginBottom: 10,
  },
  buttoncontainer: {
    flex: 0.5,
    padding: 5,
    justifyContent: 'flex-end',
  },

  checkboximage: {
    width: 30,
    height: 30,
    padding: 15,
    left: 2,
    // resizeMode: 'contain',
  },
  custombutton: {
    justifyContent: 'flex-end',
    marginTop: 6,
    marginBottom: 1,
    flex: 0.2,
    padding: 5,
    flexDirection: 'column',
  },

  textstylelogin: {
    paddingTop: 5,
    color: theme.primary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    modalPopup: state.modalPopup,
    userinfo: state.userinfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    modalShown: isModalVisible => {
      dispatch({
        type: SHOW_INFOMODAL,
        payload: {
          isModalVisible,
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
  };
};
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(TermsModal);
