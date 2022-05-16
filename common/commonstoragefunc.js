import AsyncStorage from '@react-native-async-storage/async-storage';

// Summary Screen
export const getUP_ID = async () => {
  let UP_ID = '';
  try {
    await AsyncStorage.getItem('UP_ID').then(id => {
      UP_ID = id;
      // console.log('UPID  ' + id);
      return UP_ID;
    });
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
  return UP_ID;
};

// Personal Information Screen
export const getPI_ID = async () => {
  let PI_ID = '';
  try {
    await AsyncStorage.getItem('PI_ID').then(id => {
      PI_ID = id;
      return PI_ID;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return PI_ID;
};

// Contact Details Screen
export const getC_ID = async () => {
  let C_ID = '';
  try {
    await AsyncStorage.getItem('C_ID').then(id => {
      C_ID = id;
      return C_ID;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return C_ID;
};

// Verification Screen
export const getisUserVerified = async () => {
  let C_ID = '';
  try {
    await AsyncStorage.getItem('isVerifed').then(id => {
      C_ID = id;
      return C_ID;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return C_ID;
};

// Dependant Screen
export const getisDependantAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('isDependantAdded').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

// Payment Screen
export const getisPaymentAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('isPaymentAdded').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

// FICA Screen
export const getisFicaAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('isFicaAdded').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

// Beneficiary Screen
export const getisBeneficiaryAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('isBeneficiaryAdded').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

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

export const getisIDAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('isIDUploaded').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

export const getisDIDAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('DID').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};
export const getisACAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('AC').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

export const getisMCAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('MC').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};

export const getisBCAdded = async () => {
  let isAdded = '';
  try {
    await AsyncStorage.getItem('BC').then(id => {
      isAdded = id;
      return isAdded;
    });
  } catch (e) {
    alert('Failed to save ');
  }
  return isAdded;
};
///////////////////////////////////

export const saveisDocsAdded = async isAdded => {
  try {
    await AsyncStorage.setItem('isDocsFileAdded', isAdded.toString());
  } catch (e) {
    console.log('Error' + e);
    alert('Failed to save the data');
  }
};

export const saveisIDUploaded = async (doc, isAdded) => {
  try {
    await AsyncStorage.setItem(doc.toString(), isAdded.toString());
  } catch (e) {
    console.log('Error' + e);
    alert('Failed to save the data');
  }
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
