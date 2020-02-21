// import React from 'react';
import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from 'firebase';
// import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCBD1WA76atfU-NK5oTbcNu91xftqKrk0k',
      authDomain: 'one-time-auth-17fea.firebaseapp.com',
      databaseURL: 'https://one-time-auth-17fea.firebaseio.com',
      projectId: 'one-time-auth-17fea',
      storageBucket: 'one-time-auth-17fea.appspot.com',
      messagingSenderId: '202257909488',
      appId: '1:202257909488:web:6f8ae714690313e6f4e435',
      measurementId: 'G-1L9VPLK7F3',
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={ChatScreen.HomeScreen}
          />
          <Stack.Screen
            name="Auth"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={ChatScreen.navigationOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
