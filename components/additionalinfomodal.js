import React, {useState, useEffect} from 'react';
import {Overlay} from 'react-native-elements';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import CommonStyles from '../common/commonstyles';
import {
  CoverHeader,
  CoverContent,
  PaymentHeader,
  PaymentContent,
  BeneficiaryHeader,
  BeneficairyContent,
  AdditionalChargesHeader,
  AdditionalChargesContent,
} from '../common/textcontent';
import {SHOW_ADDITIONALINFO_MODAL} from '../store/actiontypes';
import theme from '../common/theme';

const AdditionalInfoModal = props => {
  const [visible, setVisible] = useState(true);
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setTextContent();
  }, []);
  const setTextContent = () => {
    if (props.mode == 1) {
      setHeader(CoverHeader);
      setContent(CoverContent);
    }
    if (props.mode == 2) {
      setHeader(PaymentHeader);
      setContent(PaymentContent);
    }
    if (props.mode == 3) {
      setHeader(BeneficiaryHeader);
      setContent(BeneficairyContent);
    }

    if (props.mode == 4) {
      setHeader(AdditionalChargesHeader);
      setContent(AdditionalChargesContent);
    }
  };

  const toggleOverlay = () => {
    props.modalShown(false);
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.container}>
        <View style={styles.headerStyle}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>{header}</Text>
          </View>
          <View style={{flex: 0.29, paddingTop: 5}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
            />
          </View>
        </View>
        <View style={{flex: 0.8}}>
          <ScrollView>
            <View style={styles.policycontainer}>
              <Text style={CommonStyles.paraLeft}>{content}</Text>
            </View>
          </ScrollView>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    flexDirection: 'column',
    padding: 2,
    width: '95%',
    backgroundColor: '#ffffff',
  },
  headerStyle: {
    flex: 0.18,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  logoImage: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    padding: 20,
  },
  policycontainer: {
    flex: 0.8,
    padding: 4,
  },
  policysubHeaderstyle: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  benifitsstyle: {
    flex: 1,
    padding: 4,
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
  },
  buttoncontainerWellnes: {
    flex: 0.8,
    padding: 5,
  },
  loginbutton: {
    backgroundColor: '#66000000',
  },
  textstylelogin: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    modalPopup: state.modalPopup,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    modalShown: isAdditionalInfoVisible => {
      dispatch({
        type: SHOW_ADDITIONALINFO_MODAL,
        payload: {
          isAdditionalInfoVisible,
        },
      });
    },
  };
};
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(AdditionalInfoModal);
