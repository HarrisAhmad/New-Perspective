import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

// Docs screen
export const getisDocAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('isDocsFileAdded').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

///////////////////////////////////////////////////////////////////////////////////////

// SAVE

export const SaveAsyncStorage = async (key, status) => {
  try {
    await AsyncStorage.setItem(key.toString(), status.toString());
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};

export const RemoveAsyncStorage = async (key, status) => {
  try {
    await AsyncStorage.removeItem(key.toString());
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};
// GET

export const GetAsyncStorageData = async key => {
  let result = '';
  try {
    await AsyncStorage.getItem(key.toString()).then(id => {
      result = id;
      return result;
    });
  } catch (e) {
    console.log('Failed to get Data');
  }
  return result;
};

/////////////////////////////////////// ENCRYPTED STORAGE //////////////////////////////////////////

export const storeJWTToken = async jwt => {
  const token = JSON.stringify(jwt);
  try {
    await EncryptedStorage.setItem('user_token', token);
  } catch (error) {
    console.log('ENC ERROR' + error);
    // There was an error on the native side
  }
};
