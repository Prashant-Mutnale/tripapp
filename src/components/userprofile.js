import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput,AsyncStorage } from 'react-native';
import {fetchPosts} from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import store from '../redux/store'
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
let useriddetails
let followerlist
let  profilenamearray = []
let a
class userProfile extends React.Component {
  constructor() {
    super();
    this.state = {
        email: '',
        useriddata: '',
        followers: 'Follow'
    };
    this.followuser = this.followuser.bind(this)
  }
  componentWillMount(){
    AsyncStorage.getItem("useriddata").then((value) => {
        this.setState({ "useriddata": value });
        console.log(this.state.useriddata)
    }).done();
    let useriddetails = firebase.database().ref("userlist").child(this.props.keyuser);
    useriddetails.on('value',snapshot=>{
        console.log(snapshot._value)
        this.setState({
            userdetails: snapshot._value
        })
        //  this.getarraylist(this.state.useriddata)
        this.getarraylist()
    })
    // .then(()=>{
    //     console.log("makeit",this.state.userdetails.followers.profilenamearray)
    // })
    
  }
  getarraylist(){
        // console.log('getdata', useriddata)
        // a = this.state.userdetails.followers.profilenamearray
        // console.log(a)
  }
  followuser(){
      console.log("dayta",this.state.useriddata)
        if(this.state.followers == 'Follow'){
            alert('ifcalled')
            this.setState({
                followers: 'Unfollow'
            })
            profilenamearray.push(this.state.useriddata)
            let followerlist =  firebase.database().ref('userlist').child(this.props.keyuser).child('followers')
            followerlist.set({
                profilenamearray
            })
            // .then(()=>{
            //   profilenamearray = []
            // })
        }
        else{
            alert('elsecalled')
            // this.setState({
            //     followers: 'Follow'
            // })
            let db = firebase.database().ref('userlist').child(this.props.keyuser).child('followers').child('profilenamearray')
            db.child(a).remove();
        }
  }
  render() {
      console.log(this.state.userdetails)
      console.log(this.props.keyuser)
    return (
      <ScrollView>
          <Text>USerprofile</Text>
          <TouchableOpacity onPress={()=>this.followuser()}><Text>{this.state.followers}</Text></TouchableOpacity>
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

export default userProfile