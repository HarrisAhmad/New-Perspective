import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import LoadingIndicator from './components/loadingindicator_component';
import {Provider} from 'react-redux';
import store from './store/store';

import AppFlow from './routes/appflow';
import SignupNavFlow from './routes/signupNav';

import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from './common/commonstoragefunc';

const App = () => {
  const [isLoggedin, setLoggedin] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current == true) {
    } else {
      didMount.current = true;
      getStorageData();
    }
  }, [isLoggedin]);
  const getStorageData = async () => {
    // await SaveAsyncStorage('UserLoggedIn', 'true');

    const loggedin = await GetAsyncStorageData('UserLoggedIn');
    setLoggedin(loggedin);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        {isLoading == false ? (
          <NavigationContainer>
            {isLoggedin == 'true' ? <AppFlow /> : <SignupNavFlow />}
          </NavigationContainer>
        ) : (
          <LoadingIndicator />
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
