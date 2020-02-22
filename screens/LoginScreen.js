import React, {Component} from 'react';
import firebase from 'firebase';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import styles from '../constants/styles';
import User from '../User';

class loginScrean extends Component {
  static navigationOption = {
    header: null,
  };
  state = {
    phone: '',
    name: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('userPhone').then(val => {
      if (val) {
        this.setState({phone: val});
      }
    });
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  handleSubmit = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Wrong phone number');
    }
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Enter name more than 5 Character');
    } else {
      //Save user
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase
        .database()
        .ref('users/' + User.phone)
        .set({name: this.state.name});
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>CHATING APP</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Phone number"
          style={styles.input}
          onChangeText={this.handleChange('phone')}
          value={this.state.phone}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={this.handleChange('name')}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text style={styles.btnTextSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default loginScrean;
