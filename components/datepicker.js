import React, {useCallback, useRef} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {
  GET_BIRTH_YEAR,
  GET_DEPENDANT_BIRTHYEAR,
  SHOWDATEPICKER_MODAL,
  GET_ADJUSTED_DATE,
} from '../store/actiontypes';

const DatePicker = props => {
  const date = useRef(new Date());

  const onValueChange = useCallback((event, newDate) => {
    const selectedDate = newDate;
    //showPicker(false);
    props.show_DatePickerModal(false);
    // setDate(selectedDate);
    date.current = selectedDate;
    //   console.log(selectedDate);
    if (props.mode == 0 && selectedDate != undefined) {
      props.get_BirthYear(selectedDate);
    }
    if (props.mode == 1 && selectedDate != undefined) {
      props.get_Dependant_BirthYear(selectedDate);
    }
    if (props.mode == 2 && selectedDate != undefined) {
      props.get_AdjustedDate(selectedDate);
    }
  }, []);

  return (
    <>
      {props.modalPopup.isDatePickerVisible == true ? (
        <DateTimePicker
          style={{
            width: '100%',
            height: 70,
            padding: 2,
            flexDirection: 'row',
            color: '#ffffff',
            fontSize: 18,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}
          is24Hour={false}
          display="spinner"
          value={date.current}
          mode={'date'}
          format={props.format}
          textColor={'black'}
          maximumDate={new Date(2025, 5)}
          // confirmBtnText="Confirm"
          // cancelBtnText="Cancel"
          customStyles={{
            // dateIcon: {
            //   position: 'relative',
            //   justifyContent: 'flex-start',
            //   alignItems: 'flex-start',
            //   alignContent: 'flex-start',
            //   flex: 0.1,
            //   flexDirection: 'column',
            //   marginBottom: 11,
            //   marginStart: 100,
            // },
            dateInput: {
              color: '#000000',
              borderColor: '#000000',
              marginBottom: 5,
              flex: 1,
              alignContent: 'center',
              flexDirection: 'column',
            },
            // ... You can check the source to find the other keys.
          }}
          onChange={onValueChange}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
};
const mapDispatchToProps = dispatch => {
  return {
    get_BirthYear: Birth_Year => {
      dispatch({
        type: GET_BIRTH_YEAR,
        payload: {
          Birth_Year,
        },
      });
    },
    get_Dependant_BirthYear: Dependant_BirthYear => {
      dispatch({
        type: GET_DEPENDANT_BIRTHYEAR,
        payload: {
          Dependant_BirthYear,
        },
      });
    },
    get_AdjustedDate: Adjusted_Date => {
      dispatch({
        type: GET_ADJUSTED_DATE,
        payload: {
          Adjusted_Date,
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
export default connectComponent(DatePicker);
