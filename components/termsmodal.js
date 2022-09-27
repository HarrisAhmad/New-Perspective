import React, {useState, useEffect, createRef, useRef} from 'react';
import {Overlay} from 'react-native-elements';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import {
  Term,
  TermsCondition,
  Disclosure,
  DisclosureText,
} from '../common/textcontent';
import CreateAccountText from '../components/legalTextComponent';
import {GetAsyncStorageData} from '../common/commonstoragefunc';
import LoadingIndicator from '../components/loadingindicator_component';
import {SendDocs} from '../services/apiservice';
import theme from '../common/theme';
import CommonStyles from '../common/commonstyles';
import {SHOW_SIGNATUREMODAL, GET_TERMS_URL} from '../store/actiontypes';
import {CheckBox} from 'react-native-elements';
import {SaveAsyncStorage} from '../common/commonstoragefunc';
import SignatureCapture from 'react-native-signature-capture';

const TermsModal = props => {
  const [visible, setVisible] = useState(true);
  const [header, setheader] = useState('');
  const [content, setContent] = useState('');
  const [checkTerms, setCheck] = useState(false);
  const [showTerms, setTerms] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const UP_ID = useRef('');
  const policyNumber = useRef(null);

  useEffect(() => {
    checkState();
  }, []);

  const checkState = async () => {
    props.getLegalURL('https://google.com', 'https://www.youtube.com/');
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

    await SendDocs(fileData).then(async result => {
      if (result != '') {
        // setTerms(true);
        await SaveAsyncStorage('isSignatureuploaded', 1);
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

  const toggleCondiitons = () => {
    if (checkTerms == true) {
      setCheck(false);
    } else {
      setCheck(true);
      setTerms(false);
    }
  };

  const switchModalCondition = () => {
    if (showTerms) {
      return (
        <>
          <View style={styles.headerStyle}>
            <View style={CommonStyles.subheadercenter}>
              <Text style={CommonStyles.header}>ALMOST THERE</Text>
            </View>
            <View style={styles.logoImageStyle}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImage}
              />
            </View>
          </View>
          <View style={styles.contentstyle}>
            <Text style={CommonStyles.paracenter}>
              <CreateAccountText mode={1} />
            </Text>
            <Text style={styles.signHeaderTextStyle}>Please sign below</Text>
          </View>

          <SignatureCapture
            style={[{flex: 1}, styles.signaturecontainer]}
            ref={sign}
            saveImageFileInExtStorage={Platform.OS == 'android' ? true : false}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            backgroundColor={theme.secondary}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'portrait'}
          />
          <View style={styles.signButtonContainer}>
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
      {isLoading == true ? <LoadingIndicator /> : null}
      <Overlay isVisible={visible} overlayStyle={styles.container}>
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
    flex: 0.16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoImageStyle: {
    flex: 0.3,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  signHeaderTextStyle: {
    padding: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: theme.font,
  },
  signButtonContainer: {
    flexDirection: 'row',
    flex: 0.1,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  logoImage: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    padding: 20,
  },
  contentcontainer: {flex: 1, justifyContent: 'center'},
  signaturecontainer: {
    flex: 0.82,
    borderColor: theme.primary,
    borderWidth: 1,
  },
  contentstyle: {
    flex: 0.55,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  checkboximage: {
    width: 30,
    height: 30,
    padding: 15,
    left: 2,
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
    getLegalURL: (privacyURL, termsURL) => {
      dispatch({
        type: GET_TERMS_URL,
        payload: {
          privacyURL,
          termsURL,
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
