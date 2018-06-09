import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput,AsyncStorage } from 'react-native';
import {fetchPosts} from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import store from '../redux/store'
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        useriddata: ''
    };
    this._signinuser = this._signinuser.bind(this)
  }
//   _retriveuser(getid){
//     let retriveref = firebase.database().ref('userlist').child(getid);
//     retriveref.on('value', function(snapshot) {
//         console.log("snpdata", snapshot)
//         Actions.home()
// });
//   }
componentWillMount(){
  AsyncStorage.getItem("useriddata").then((value) => {
    this.setState({"useriddata": value});
}).done();
}
  _signinuser(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((response) => {
        console.log(response)
        AsyncStorage.setItem('useriddata', response._user.uid);
        Actions.home()
        // this._retriveuser(response._user.uid)
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
  }
  render() {
      console.log(this.state.email)
      console.log(this.state.password)
      console.log("asyncdata", this.state.useriddata)
    return (
      <ScrollView>
        <TextInput
        placeholder = {'Email'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({email: text})}
        value={this.state.email}
      />
         <TextInput
         placeholder = {'Password'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({password: text})}
        value={this.state.password}
      />
      <TouchableOpacity onPress = {()=>this._signinuser()}>
          <Text>Sign in</Text>
      </TouchableOpacity>
     <TouchableOpacity onPress = {()=>Actions.signup()}><Text>Dont have an account ?</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});

export default Signin