import React from 'react';
import {TextInput, configureFonts, Switch} from 'react-native-paper';
import {Text} from 'react-native';
import theme from '../common/theme';
export const CustomTextInput = props => {
  return (
    <TextInput
      style={props.style}
      underlineColor="transparent"
      keyboardType={props.keyboardType}
      label={<Text style={{fontFamily: theme.font}}>{props.label}</Text>}
      value={props.value}
      placeholder={props.placeHolder}
      theme={{
        colors: {
          primary: theme.textinputprimary,
          placeholder: theme.textinputplaceholder,
          text: theme.textinputtext,
        },
        fonts: configureFonts(theme.font),
      }}
      onChangeText={text => props.onChange(text)}
    />
  );
};

export const CustomGenderSwitch = props => {
  return (
    <>
      <Text
        style={{
          flex: 0.8,
          paddingHorizontal: 10,
          paddingLeft: 10,
          textAlign: 'right',
          fontSize: 20,
          color: theme.textcolor,
          fontFamily: theme.font,
        }}>
        Male
      </Text>
      <Switch
        color={theme.primary}
        style={props.style}
        value={props.value}
        onValueChange={() => props.toggle()}
      />
      <Text
        style={{
          flex: 0.8,
          paddingHorizontal: 10,
          textAlign: 'left',
          fontSize: 20,
          color: theme.textcolor,
          fontFamily: theme.font,
        }}>
        Female
      </Text>
    </>
  );
};
