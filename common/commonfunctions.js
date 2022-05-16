import EncryptedStorage from 'react-native-encrypted-storage';
import NetInfo from '@react-native-community/netinfo';

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
  console.log('DOB' + dob1);
  var today = new Date();
  var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  console.log(age_now);
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
