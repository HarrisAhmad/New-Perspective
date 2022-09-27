import React from 'react';
import {View, Image} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {connect} from 'react-redux';
import theme from '../common/theme';
import {
  GET_RELATIONSHIP,
  GET_TITLE,
  GET_COUNTRIES,
  GET_NATIONALITY,
  GET_BANKNAME,
  GET_ACC_TYPE,
  GET_DEBITORDER,
  GET_BENEFICIARY_RELATION,
} from '../store/actiontypes';

const CustomDropdown = props => {
  return (
    <ModalDropdown
      style={{
        flex: 1,
        padding: 1,
        flexDirection: 'column',
        backgroundColor: '#66000000',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#66000000',
      }}
      renderRightComponent={rightComponent}
      options={props.relation}
      disabled={props.isEnabled}
      onSelect={(position, options) => {
        index = position + 1;
        if (props.mode == 0) {
          props.get_Relation(options, index);
          //   console.log(index);
          //   console.log(options);
        }
        if (props.mode == 1) {
          props.get_UserTitle(options, index);
          // console.log(index);
          // console.log('OPT' + props.userinfo.title);
          // console.log('MODE' + props.mode);
        }
        if (props.mode == 2) {
          props.get_UserCountries(options, index);
          // console.log(index);
          // console.log(options);
          // console.log('MODE' + props.mode);
        }
        if (props.mode == 3) {
          props.get_UserNationality(options, index);
          // console.log(index);
          // console.log(options);
          // console.log('MODE' + props.mode);
        }
        if (props.mode == 4) {
          props.get_BankName(options, index);
          // console.log(index);
          // console.log(options);
          // console.log('MODE' + props.mode);
        }
        if (props.mode == 5) {
          props.get_AccountType(options, index);
          // console.log(index);
          // console.log(options);
          // console.log('MODE' + props.mode);
        }
        if (props.mode == 6) {
          props.get_DebitOrder(options, index);
          // console.log(index);
          // console.log(options);
          // console.log('MODE' + props.mode);
        }
        if (props.mode == 7) {
          props.get_BeneficiaryRelation(options, index);
        }
      }}
      defaultValue={props.default}
      textStyle={{fontSize: 16, color: '#888888', fontFamily: theme.font}}
      dropdownListProps={{backgroundColor: theme.secondary}}
      dropdownStyle={{
        backgroundColor: theme.secondary,
        zIndex: 200,
        color: theme.secondary,
        elevation: Platform.OS === 'android' ? 1000 : 0,
        position: 'absolute',
        width: '90%',
        height: props.height,
        top: 50,
      }}
      dropdownTextStyle={{
        fontSize: 16,
        backgroundColor: theme.secondary,
        color: theme.textcolor,
        fontFamily: theme.font,
      }}
    />
  );
};

const rightComponent = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        style={{
          height: 40,
          width: 20,
          resizeMode: 'contain',
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
        source={require('../assets/images/dropdownarrow.png')}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {userinfo: state.userinfo};
};
const mapDispatchToProps = dispatch => {
  return {
    get_Relation: (relationship, relationshipID) => {
      dispatch({
        type: GET_RELATIONSHIP,
        payload: {
          relationship,
          relationshipID,
        },
      });
    },
    get_UserTitle: (title, titleID) => {
      dispatch({
        type: GET_TITLE,
        payload: {
          title,
          titleID,
        },
      });
    },
    get_UserCountries: (countries, countriesID) => {
      dispatch({
        type: GET_COUNTRIES,
        payload: {
          countries,
          countriesID,
        },
      });
    },
    get_UserNationality: (nationality, nationalityID) => {
      dispatch({
        type: GET_NATIONALITY,
        payload: {
          nationality,
          nationalityID,
        },
      });
    },
    get_BankName: (BankName, B_ID_FK) => {
      dispatch({
        type: GET_BANKNAME,
        payload: {
          BankName,
          B_ID_FK,
        },
      });
    },
    get_AccountType: (AccountType, AT_ID_FK) => {
      dispatch({
        type: GET_ACC_TYPE,
        payload: {
          AccountType,
          AT_ID_FK,
        },
      });
    },
    get_DebitOrder: (DebitOrder, DO_ID_FK) => {
      dispatch({
        type: GET_DEBITORDER,
        payload: {
          DebitOrder,
          DO_ID_FK,
        },
      });
    },

    get_BeneficiaryRelation: (beneficiaryRelation, beneficiaryR_ID) => {
      dispatch({
        type: GET_BENEFICIARY_RELATION,
        payload: {
          beneficiaryRelation,
          beneficiaryR_ID,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(CustomDropdown);
