import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {USER_LOCATION} from '../store/actiontypes';
import theme from '../common/theme';

const GooglePlacesSearchBar = props => {
  return (
    <View style={{flex: 0.8, paddingTop: 3}}>
      <GooglePlacesAutocomplete
        // placeholder="Enter Location"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed={'auto'} // true/false/undefined
        fetchDetails={true}
        isRowScrollable={true}
        keyboardShouldPersistTaps={'handled'}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          props.get_UserLocation(data.description);
          //console.log(props.eventData.E_Location);
          // console.log(data.description);
        }}
        getDefaultValue={() => {
          return 'Hello'; // text input default value
        }}
        query={
          props.isEvent == false
            ? {
                key: 'AIzaSyBNPsrJQosA9A026VXEJfwUUGZDnyXug-Y',
                language: 'en', // language of the results
                components: 'country:za',
                types: '(cities)', // default: 'geocode'
              }
            : {
                key: 'AIzaSyBNPsrJQosA9A026VXEJfwUUGZDnyXug-Y',
                language: 'en', // language of the results
                components: 'country:za',
                //  types: '(cities)', // default: 'geocode'
              }
        }
        textInputProps={{
          placeholder: 'Enter Address',
          placeholderTextColor: '#888888',
          leftIcon: {type: 'font-awesome', name: 'chevron-left'},
          errorStyle: {color: 'red'},
        }}
        styles={{
          container: {
            flex: 0.1,
          },
          textInputContainer: {
            flexDirection: 'row',
          },
          textInput: {
            backgroundColor: theme.primary,
            color: theme.textinputtext,
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
          },
          description: {
            fontWeight: 'bold',
            color: '#57BCB6',
            elevation: 1000,
          },
          listView: {
            top: 40.5,
            zIndex: 1000,
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 0,
            //   height: 1,
            // },
            // shadowOpacity: 0.5,
            // shadowRadius: 1.41,
            elevation: 1000,
            position: 'absolute',
            color: 'black',
            width: '100%',
          },
          row: {
            backgroundColor: '#404044',
            color: '#ffffff',
            zIndex: 3,
            position: 'relative',
            elevation: 10,
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.45,
            backgroundColor: 'white',
          },
        }}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        debounce={200}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {userinfo: state.userinfo};
};
const mapDispatchToProps = dispatch => {
  return {
    get_UserLocation: userlocation => {
      dispatch({
        type: USER_LOCATION,
        payload: {
          userlocation,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(GooglePlacesSearchBar);
