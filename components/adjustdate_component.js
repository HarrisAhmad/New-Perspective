import React, {useState} from 'react';
import {
  View,
  Text,
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
  const [showDate, setShow] = useState(false);
  return (
    <View style={{flex: 1, marginTop: 35}}>
      <View style={styles.policyHeader}>
        <View style={styles.headerCenter}>
          <Text style={CommonStyles.header}>Policy Premium</Text>
        </View>
        <View style={styles.showPremium}>
          <View style={styles.totalContainer}>
            <Text style={styles.premiumText}>R{props.premium}</Text>
            <Text style={CommonStyles.vatTextStyle}>VAT incl.</Text>
          </View>
        </View>
        <View style={styles.headerCenterComenccement}>
          <Text style={CommonStyles.header}>Commencement Date</Text>
        </View>
        <View style={styles.headerCenter}>
          <Text style={CommonStyles.header}>{props.getCurrentDate()}</Text>
        </View>
      </View>
      {!showDate ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.showDateButtonStyle}
          onPress={() => setShow(true)}>
          <View style={styles.view}>
            <Text style={CommonStyles.subheadercenter}>
              {' '}
              Change Commencement Date
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.policycontainer}>
          <View style={CommonStyles.paraLeft}>
            <Text style={CommonStyles.paraLeft}>Adjust Commencement date</Text>
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
            <CustomButton
              text="UPDATE"
              onPressEvent={() => props.updateDate()}
            />
          </View>
        </View>
      )}
    </View>
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
  headerCenter: {
    flex: 0.4,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  headerCenterComenccement: {
    flex: 0.5,
    marginTop: 5,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  policyHeader: {
    flex: 1,
  },
  policycontainer: {
    flex: 1,
    padding: 2,
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
  showDateButtonStyle: {
    flex: 0.5,
    top: 5,
    justifyContent: 'flex-end',
  },
  textstyle: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 16,
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  totalContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 0,
    marginBottom: 5,
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
  showPremium: {
    flex: 0.5,
  },
  premiumText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.font,
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
