import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Button,
  Image,
  Platform,
} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    name: User.name,
    image: User.image,
    loading: false,
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  handleChoosePhoto = () => {
    this.setState({loading: true});

    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Create a root reference
        const storage = firebase.storage();
        const storageRef = storage.ref('images/').child('image');

        uri = response.uri;
        mime = 'image/jpg';
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;
        const imageRef = storageRef;
        fs.readFile(uploadUri, 'base64')
          .then(data => {
            return Blob.build(data, {type: `${mime};BASE64`});
          })
          .then(blob => {
            uploadBlob = blob;
            return imageRef.put(blob, {contentType: mime});
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            console.log(url);
            User.image = url;
            if (User.image !== this.state.image) {
              firebase
                .database()
                .ref('users')
                .child(User.phone)
                .set({name: User.name, image: url});
            }
          })
          .catch(error => {
            console.log(error.message);
          });
        this.setState({
          image: response,
        });
        User.image = response;
      }
    });
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      console.log('Error!', 'Please enter valid name!');
    } else if (User.name !== this.state.name) {
      firebase
        .database()
        .ref('users')
        .child(User.phone)
        .update({name: this.state.name});
      User.name = this.state.name;
      console.log('Success!!!', 'You have successfully changed your name!');
    }
  };

  render() {
    const {image} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {image ? (
          <Image
            source={{uri: image.uri}}
            style={{width: 200, height: 200, borderRadius: 100}}
          />
        ) : User.image ? (
          <Image
            source={{uri: User.image}}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
        ) : (
          <Image
            source={require('../images/user.png')}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
        )}

        <Button title="Choose photo" onPress={this.handleChoosePhoto} />
        <Text style={{fontSize: 20}}>Mobile Number: {User.phone}</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btnTextUpdate}>update name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logout}>
          <Text style={styles.btnTextLogout}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;
