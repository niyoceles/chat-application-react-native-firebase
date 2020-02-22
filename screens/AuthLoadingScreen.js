import React from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View} from 'react-native';
import User from '../User';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    console.log(User.phone);
    this.props.navigation.navigate(User.phone ? 'Home' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
