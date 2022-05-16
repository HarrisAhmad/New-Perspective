import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import CommonStyles from '../common/commonstyles';
import CustomButton from '../components/custombutton';
import DatePicker from '../components/datepicker';
import theme from '../common/theme';
import {
  SHOW_DATEADJUSTMODAL,
  SHOWDATEPICKER_MODAL,
  SHOW_SIGNATUREMODAL,
} from '../store/actiontypes';

const AdjustDateModal = props => {
  return (
    <>
      <View style={styles.headerStyle}>
        <View style={CommonStyles.subheaderleft}>
          <Text style={CommonStyles.header}>ADJUST POLICY DATE</Text>
        </View>
        <View style={{flex: 0.29, paddingTop: 5}}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
          />
        </View>
      </View>

      <View style={styles.policycontainer}>
        <View style={CommonStyles.paraLeft}>
          <Text style={CommonStyles.paraLeft}>
            Adjust the policy start month only
          </Text>
        </View>
        <View style={styles.textinputstyle}>
          <TouchableWithoutFeedback
            activeOpacity={0.4}
            style={CommonStyles.textinputstyle}
            onPress={() => props.show_DatePickerModal(true)}>
            <Text style={CommonStyles.palceholderstyle}>
              {props.modalPopup.isDatePickerVisible == false
                ? props.getCurrentDate()
                : null}
            </Text>
          </TouchableWithoutFeedback>
          <View>
            {props.modalPopup.isDatePickerVisible == true ? (
              <DatePicker format="DD-MMM-YYYY" mode={2} />
            ) : null}
          </View>
        </View>
        <View style={styles.custombuttoncontainer}>
          <CustomButton text="UPDATE" onPressEvent={() => props.updateDate()} />
        </View>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.loginbutton}
          onPress={() => props.skip()}>
          <Text style={styles.textstylelogin}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'column',
    padding: 2,
    width: '95%',
    backgroundColor: '#ffffff',
  },
  headerStyle: {
    flex: 0.12,
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
    flex: 0.1,
    justifyContent: 'flex-end',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  textinputstyle: {
    flex: 0.2,
    flexDirection: 'column',
    backgroundColor: '#66000000',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.bordercolor,
  },
  custombuttoncontainer: {
    flex: 0.55,
    paddingHorizontal: 20,
    marginTop: 5,
    justifyContent: 'center',
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
    modalShown: isDateAdjusterModalShown => {
      dispatch({
        type: SHOW_DATEADJUSTMODAL,
        payload: {
          isDateAdjusterModalShown,
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
    show_DatePickerModal: isDatePickerVisible => {
      dispatch({
        type: SHOWDATEPICKER_MODAL,
        payload: {
          isDatePickerVisible,
        },
      });
    },
  };
};
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(AdjustDateModal);
