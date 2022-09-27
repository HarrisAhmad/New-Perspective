import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

import CreateAccountText from '../components/legalTextComponent';

export default CheckBoxComponent = forwardRef((props, _ref) => {
  const [isCheckedBox, setCheckbox] = useState(false);

  useImperativeHandle(_ref, () => ({
    getCheckedState: () => {
      return isCheckedBox;
    },
  }));
  const onChecked = () => {
    if (isCheckedBox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
  };

  return (
    <>
      <View style={styles.rowcontainerstyle}>
        <View style={styles.checkboxcontainer}>
          <TouchableOpacity>
            <CheckBox
              center
              checkedIcon={
                <Image
                  style={styles.checkboximage}
                  source={require('../assets/images/checkedbox.png')}
                />
              }
              uncheckedIcon={
                <Image
                  style={styles.checkboximage}
                  source={
                    props.mode == 0
                      ? require('../assets/images/checkboxwhite.png')
                      : require('../assets/images/uncheckedbox.png')
                  }
                />
              }
              checked={isCheckedBox}
              onPress={() => onChecked()}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.policydetailcontainer}>
          <TouchableWithoutFeedback style={styles.rowTouch}>
            <View style={styles.rowstyle}>
              <CreateAccountText mode={props.mode} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  rowcontainerstyle: {
    flex: 1,
    flexDirection: 'row',
  },
  policydetailcontainer: {
    flex: 0.8,
  },
  rowstyle: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },
  rowTouch: {flex: 0.5, flexDirection: 'row'},
  checkboxcontainer: {
    flex: 0.2,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  checkboximage: {
    width: 30,
    height: 30,
    padding: 5,
    bottom: 8,
    left: 2,
  },
});
