import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native';

import firebase from 'firebase';
import User from '../User';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation, route}) => ({
    title: 'Chats',
    headerLeft: null,
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../images/user.png')}
          style={{width: 32, height: 32, marginRight: 10}}
        />
      </TouchableOpacity>
    ),
  });

  state = {
    users: [],
  };

  UNSAFE_componentWillMount() {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat', item)}
        style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
        <Text style={{fontSize: 20}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (!User.phone) {
      this.props.navigation.navigate('Auth');
    }

    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
        />
      </SafeAreaView>
    );
  }
}
