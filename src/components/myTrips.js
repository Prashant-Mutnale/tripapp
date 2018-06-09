import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput,AsyncStorage } from 'react-native';
import {fetchPosts} from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import store from '../redux/store'
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
let snaparray = []
let todateconvert
let datetoconvert
let statusdata
class myTrips extends React.Component {
  constructor() {
    super();
    this.state = {
        useriddata: '',
        profiletripslist: '',
        todaytime: '',
        statustrips: ''
    };
    this.getdatacount = this.getdatacount.bind(this)
    // this.signout = this.signout.bind(this)
  }
  // signout(){
  //   AsyncStorage.removeItem('useriddata')
  //   Actions.signin()
  // }
componentWillMount(){
  let todaysdate = new Date()
  // console.log("todaysdate",todaysdate)
  let timeStampToday = todaysdate.getTime()
  // console.log("todaystimestamp",timeStampToday)
  this.setState({
    todaytime : timeStampToday
  })
    // let snaparray = []
    AsyncStorage.getItem("useriddata").then((value) => {
        this.setState({"useriddata": value});
        console.log("usedadasdasriddata",this.state.useriddata)
        let readmytrips = firebase.database().ref('userlist').child(this.state.useriddata).child('mytrips');
        readmytrips.on('value', snapshot=> { 
            console.log("getsnapdatat", snapshot)
            if(snapshot._value !== null && snapshot._value !== undefined){
              let usertripslist = snapshot._value
              snaparray =  Object.keys(usertripslist).map(function(e){
                  return usertripslist[e]
              })
              console.log(snaparray)
              this.setState({
                profiletripslist: snaparray
              })
            }
    });
    }).done();
    console.log("useriddata",this.state.useriddata)
}
getdatacount(fromget,toget){
  console.log("fromget",fromget)
  console.log("toget",toget)
    if(this.state.todaytime> fromget && toget>fromget && toget>this.state.todaytime){
   statusdata = "Current"
      // console.log("Current")
      // alert("current")
   }
   else if(this.state.todaytime<fromget){
    //  this.setState({
    //    statustrips: "Upcoming"
    //   })
    statusdata = "upcoming"
     console.log("upcoming")
    //  alert("upcoming")
   }
   else {
    //  this.setState({
    //    statustrips: "Completed"
    //   })
    statusdata = "Completed"
      console.log("Completed")
      // alert("Completed")
   }
}
// componentDidMount(){
//   if(this.state.todaytime> datetoconvert && todateconvert>datetoconvert && todateconvert>this.state.todaytime){
//     // this.setState({
//     //    statustrips: "Current"
       
//     //   })
//       console.log("Current")
//       // alert("current")
//    }
//    else if(this.state.todaytime<datetoconvert){
//     //  this.setState({
//     //    statustrips: "Upcoming"
//     //   })
//      console.log("upcoming")
//     //  alert("upcoming")
//    }
//    else {
//     //  this.setState({
//     //    statustrips: "Completed"
//     //   })
//       console.log("Completed")
//       // alert("Completed")
//    }
// }
  render() {
    //   console.log("dataconsole", this.state.useriddata)
    console.log("useriddata",this.state.useriddata)
    console.log("listedtrips", snaparray)
    return (
      <ScrollView>
          <TouchableOpacity 
          onPress = {()=>Actions.createtrips()}
          style = {{
              flexDirection: 'row'
          }}>
              <View style = {{
                  flex: 1,
                  backgroundColor: 'red'
              }}>
              <Text>image</Text>
              </View>
              <View style = {{
                  flex: 2
              }}>
                 <Text>content</Text>
              </View>
          </TouchableOpacity>
          {
            this.state.profiletripslist!==""?
            this.state.profiletripslist.map((items,i) =>{
              // console.log("inneritems", items.fromdata)
              this.getdatacount(items.fromdata, items.todate)
              return(
                <TouchableOpacity key = {i}
                onPress = {()=>Actions.tripsdetails()}
                // onPress = {()=>Actions.createtrips()}
                style = {{
                    flexDirection: 'row'
                }}>
                    <View style = {{
                        flex: 1,
                        backgroundColor: 'red'
                    }}>
                    <Text>image</Text>
                    </View>
                    <View style = {{
                        flex: 2
                    }}>
                       <Text>{items.Triptitle}</Text>
                       {
                         items.memberstrips !=="" && items.memberstrips !== undefined?
                         Object.values(items.memberstrips).map((items1, i) =>{
                           return(
                            <Text key = {i}>{items1.namedata}</Text>
                           )
                         })
                         :console.log("error")
                       }
                       <Text>{items.fromdata}</Text>
                       <Text>{items.todate}</Text>
                       <Text>{statusdata}</Text>
                    </View>
                    
                </TouchableOpacity>
              )
            }): null
          }
        {/* <TouchableOpacity onPress = {()=>this.signout()}> <Text>Sign out</Text></TouchableOpacity> */}
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

export default myTrips