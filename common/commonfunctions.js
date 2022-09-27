import React from 'react';
import ActionBarImage from '../components/actionbar_image';
import EncryptedStorage from 'react-native-encrypted-storage';
import NetInfo from '@react-native-community/netinfo';
import theme from '../common/theme';

export const GetUserDate = birthYear => {
  let currentDate = '';
  if (birthYear != '') {
    dateTime = new Date(birthYear + '');

    date = ('0' + dateTime.getDate()).slice(-2);
    month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    year = dateTime.getFullYear();
    //console.log(year + '-' + month + '-' + date);
    actualDate = year + '-' + month + '-' + date;
    currentDate = actualDate;

    return currentDate;
  } else {
    return 'Enter DOB';
  }
};

export const GetPolicyBenifitDate = () => {
  let policyBenifitDate = '';
  dateTime = new Date();
  dateTime.setDate(dateTime.getDate());
  // console.log("SEt Date" + new Date(settingDate));
  if (dateTime != '') {
    date = ('0' + dateTime.getDate()).slice(-2);
    month = ('0' + (dateTime.getMonth() + 3)).slice(-2);
    year = dateTime.getFullYear();
    policyBenifitDate = year + '-' + month + '-' + date;
  }
  return policyBenifitDate;
};

export const UserSession = async () => {
  let token = '';
  try {
    data = await EncryptedStorage.getItem('user_token');

    if (data !== undefined) {
      //  console.log("Congrats! You've just retrieved your first value" + data);
      token = data;
      // setToken(data);
      // Congrats! You've just retrieved your first value!
      return token;
    }
  } catch (error) {
    console.log(error);
    // There was an error on the native side
  }
  return token;
};

export const CalculateAge = dob1 => {
  var today = new Date();
  var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
};

//// Check Internet Connectivity
export const CheckInternetConnectivity = async () => {
  let checkConnectivity = false;
  checkConnectivity = await NetInfo.fetch().then(networkState => {
    checkConnectivity = networkState.isConnected;
    return checkConnectivity;
  });
  return checkConnectivity;
};

//////////////////////////////////// NAV HEADER OPTION ///////////////////////////////

export const screenOptionswithNoBackNav = () => {
  return {
    title: '',
    headerTitleStyle: {
      color: theme.primary,
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#F3F1F1',
      height: 60,
    },

    headerLeft: () => null,
    headerRight: () => <ActionBarImage />,
  };
};

export const drawerOptionswithNoBackNav = label => {
  return {
    title: '',
    headerTitleStyle: {
      color: theme.primary,
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    drawerLabel: label,
    headerStyle: {
      backgroundColor: '#F3F1F1',
      height: 60,
    },

    headerRight: () => <ActionBarImage />,
  };
};

export const screenOptionswithBackNav = () => {
  return {
    title: '',
    headerTitleStyle: {
      flex: 1,
      color: '#fcb40c',
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#F3F1F1',
      height: 60,
    },
    headerRight: () => <ActionBarImage />,
  };
};
