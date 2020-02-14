import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../constants/styles';

export default class ChatScreen extends Component {
  state = {
    textMessage: '',
  };

  handleChange = key => value => {
    this.setState({[key]: value});
  };

  handleSubmitMessage = async () => {};

  render() {
    return (
      <SafeAreaView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            value={this.state.textMessage}
            onChangeText={this.handleChange('textMessage')}
            placeholder="Enter message"
          />
          <TouchableOpacity onPress={this.handleSubmitMessage}>
            <Text style={styles.btnTextSubmit}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
