import React, {useState, useCallback} from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import MonthPicker from 'react-native-month-year-picker';
import {GET_BIRTH_YEAR} from '../store/actiontypes';

const DatePicker = props => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const showPicker = useCallback(value => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      console.log(selectedDate);
      props.get_BirthYear(selectedDate);
    },
    [date, showPicker],
  );
  return (
    <>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          maximumDate={new Date(2022, 5)}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {userinfo: state.userinfo};
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
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(DatePicker);
