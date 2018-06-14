import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput,AsyncStorage } from 'react-native';
import {fetchPosts} from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import store from '../redux/store'
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
        fname: '',
        lname: '',
        email : '',
        password: '',
        uid: '',
        mobile: '',
        avararprofile: 'https://firebasestorage.googleapis.com/v0/b/groupapp-2d21b.appspot.com/o/profile.png?alt=media&token=f76208d7-fde3-48ac-9886-b62e5acc92f9'
      // firebase things?
    };
    // this.login = this.login.bind(this);
    this.signuser = this.signuser.bind(this)
    this.getuserdata = this.getuserdata.bind(this)
    // this.onLoginOrRegister = this.onLoginOrRegister.bind(this)
  }

  componentDidMount() {
    GoogleSignin.configure({
      // webClientId: "AIzaSyCpiXB9dbpuAqPKIbZFi9XVm3XWl_1p52c",
      iosClientId: '726193411271-8dgqvci7i3s0lvjkdmf9moe2sn11i2m5.apps.googleusercontent.com'
    })
    .then(() => {
      console.log("true")
      // you can now call currentUserAsync()
    });
    // firebase things?
  }
  getuserdata(getuid){
    firebase.database().ref("userlist").child(getuid).set({
        firstname: this.state.fname,
        lastname:this.state.lname,
        email: this.state.email,
        mobile: this.state.mobile,
        uid : getuid,
        avatar: this.state.avararprofile
      }, function(error) {
        if (error) {
            console.log("dataerror")
          // The write failed...
        } else {
            console.log('datatsavedsucces')
          // Data saved successfully!
        }
      });
    }
login(){
  GoogleSignin.signIn()
.then((user) => {
  console.log(user);
  // this.setState({user: user});
  const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
  console.log("got", credential.secret)
  // Login with the credential
  return firebase.auth().signInWithCredential(credential);
})
.then((userdata) =>{
    console.log("userdata", userdata)
    let fullname= userdata._user.displayName;
    let splitname = fullname.split(" ")
    let namefirst = splitname[0]
    let namelast = splitname[1]
    console.log(splitname)
    this.setState({
        fname: splitname[0],
        lname: splitname[1],
        email: userdata._user.email,
        uid: userdata._user.uid
    })
    this.getuserdata(userdata._user.uid)
    AsyncStorage.setItem('useriddata', userdata._user.uid);
    Actions.home()
})
.catch((err) => {
  console.log('WRONG SIGNIN', err);
})
.done();
}

signuser(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      console.log(user._user.uid)
      this.getuserdata(user._user.uid)
    })
    .catch((error) => {
        console.log(error)
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}
  render() {
      console.log(this.state.email)
      console.log(this.state.password)
    return (
      <ScrollView>
    
        <TextInput
        placeholder = {'First Name'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({fname: text})}
        value={this.state.fname}
      />
      <TextInput
        placeholder = {'Last Name'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({lname: text})}
        value={this.state.lname}
      />
        <TextInput
        placeholder = {'Mobile'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({mobile: text})}
        value={this.state.mobile}
      />
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
      <TouchableOpacity onPress = {()=>this.signuser()}>
          <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style = {{
          marginTop: 30
        }}
        onPress = {()=>this.login()}><Text>Sign in with google</Text></TouchableOpacity>
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

export default Signup