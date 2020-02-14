import React, {Component} from 'react';
import {SafeAreaView, View, Text, AsyncStorage, FlatList} from 'react-native';
import firebase from 'firebase';
// import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import User from '../User';
import styles from '../constants/styles';

export default class HomeScreen extends Component {
  state = {
    users: [],
  };

  componentWillMount() {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      this.setState(prevState => {
        return {
          users: [...prevState.users, person],
        };
      });
    });
  }
  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPres={() => this.props.navigation.navigate('Chat', item)}
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
