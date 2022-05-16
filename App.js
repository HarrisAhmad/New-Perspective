import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/store';

import {
  InitialNavigator,
  PersonalInfoNavigator,
} from './routes/navigationstack';
import {
  getUP_ID,
  getPI_ID,
  getC_ID,
  getisUserVerified,
  getisDependantAdded,
  getisPaymentAdded,
  getisFicaAdded,
  getisBeneficiaryAdded,
  getisDocAdded,
} from './common/commonstoragefunc';

const App = () => {
  const [UP_ID, setUPID] = useState(null);
  const [PI_ID, setPI_ID] = useState(null);
  const [C_ID, setCID] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [isDepandantAdded, setIsDependantAdded] = useState(null);
  const [isPaymentAdded, setIsPaymentAdded] = useState(null);
  const [isFicaAdded, setisFicaAdded] = useState(null);
  const [isBeneficiaryAdded, setIsBeneficairyAdded] = useState(null);
  const [isDocsAdded, setDocsAdded] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const didMount = useRef(false);
  //  const UP_ID = useRef(0);
  useEffect(() => {
    if (didMount.current == true) {
    } else {
      didMount.current = true;
      getStorageData();
    }
  }, []);
  const getStorageData = async () => {
    const ID = await getUP_ID();
    setUPID(ID);

    const PIID = await getPI_ID();
    setPI_ID(PIID);

    const CID = await getC_ID();
    setCID(CID);

    const verify = await getisUserVerified();
    setIsVerified(verify);

    const isAdded = await getisDependantAdded();
    setIsDependantAdded(isAdded);

    const isPayment = await getisPaymentAdded();
    setIsPaymentAdded(isPayment);

    const isFica = await getisFicaAdded();
    setisFicaAdded(isFica);

    const isBeneficiary = await getisBeneficiaryAdded();
    setIsBeneficairyAdded(isBeneficiary);
    const isDocFileAdded = await getisDocAdded();
    setDocsAdded(isDocFileAdded);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        {isLoading == false ? (
          <NavigationContainer>
            {console.log('DEPENDANT' + isDepandantAdded)}
            {UP_ID != null ? (
              <PersonalInfoNavigator
                personalInfoID={PI_ID}
                contactInfoID={C_ID}
                isUserVerified={isVerified}
                isUserDependantAdded={isDepandantAdded}
                isPaymentAdded={isPaymentAdded}
                isFicaAdded={isFicaAdded}
                isBeneficiaryAdded={isBeneficiaryAdded}
                isDocFileAdded={isDocsAdded}
              />
            ) : (
              <InitialNavigator />
            )}
          </NavigationContainer>
        ) : (
          <View></View>
        )}
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
