import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput,AsyncStorage } from 'react-native';
import {fetchPosts} from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import store from '../redux/store'
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import * as ImagePicker from 'react-native-image-picker'
let datetoconvert
let todateconvert
let key
let profilenamearray = []
var options = {
  // title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class createTrips extends React.Component {
  constructor() {
    super();
    this.state = {
        isDateTimePickerVisible: false,
        isDateTimePickerVisibleto: false,
        fromdate: '',
        todate: '',
        useriddata: '',
        tripname: '',
        places: '',
        tripbackground: '',
        todaytime: '',
        statustrips: ''
    };
    this.addtrip = this.addtrip.bind(this)
    this.tripmembers = this.tripmembers.bind(this)
    this.placecall = this.placecall.bind(this)
    this.explorememberdata  = this.explorememberdata.bind(this)
    this.getimage = this.getimage.bind(this)
    // this.tripnamecall = this.tripnamecall.bind(this)
  }
  tripnamecall(text){
    console.log(text)
    this.setState({
      tripname: text
    })
    AsyncStorage.setItem('tripsname',  JSON.stringify(this.state.tripname));
}
placecall(text){
    console.log("placesdatatat", text)
    this.setState({
        places: text
    })
    AsyncStorage.setItem('placesdata',  JSON.stringify(this.state.places))
  }
  componentWillMount(){
    let todaysdate = new Date()
    console.log("todaysdate",todaysdate)
    let timeStampToday = todaysdate.getTime()
    console.log("todaystimestamp",timeStampToday)
    this.setState({
      todaytime : timeStampToday
    })
    AsyncStorage.getItem("tripsname").then((value) => {
        console.log("valuedata", value)
        this.setState({"tripname": JSON.parse(value)});
    }).done();
    AsyncStorage.getItem("placesdata").then((value) => {
        // console.log("valuedata", value)
        this.setState({"places": JSON.parse(value)});
    }).done();
    AsyncStorage.getItem("fromdatesync").then((value) => {
        console.log("valuedatasync", value)
        this.setState({"fromdate": JSON.parse(value)});
    }).done();
    AsyncStorage.getItem("todatesync").then((value) => {
      console.log("valuedatasync", value)
      this.setState({"todate": JSON.parse(value)});
  }).done();
   AsyncStorage.getItem("backimageurl").then((value) => {
        console.log("valuedatasync", value)
        this.setState({"tripbackground": JSON.parse(value)});
    }).done();
      if(this.props.profile !=="" && this.props.profile !== undefined){
        profilenamearray.push(this.props.profile)
        console.log("dataays", profilenamearray)
      }
    AsyncStorage.getItem("useriddata").then((value) => {
        this.setState({"useriddata": value});
    }).done();
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _showDateTimePickerto = () => this.setState({ isDateTimePickerVisibleto: true });

  _hideDateTimePickerto = () => this.setState({ isDateTimePickerVisibleto: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    datetoconvert = date.getTime();
    // console.log(dateconvert)
    let dataseperat = date
    let gotfromdate = date.toString().substring(4, 15)
    console.log(gotfromdate)
    this.setState({
        fromdate: gotfromdate
    })
    this._hideDateTimePicker();
    AsyncStorage.setItem('fromdatesync',  JSON.stringify(gotfromdate));
    console.log("newdata",gotfromdate)
  };

  _handleDatePickedto = (dateto) => {
    console.log('A date has been picked: ', dateto);
    todateconvert = dateto.getTime()
    let gottodate = dateto.toString().substring(4, 15)
    console.log(gottodate)
    this.setState({
        todate: gottodate
    })
    this._hideDateTimePickerto();
    AsyncStorage.setItem('todatesync',  JSON.stringify(gottodate));
    // console.log("newdata",gotfromdate)
    if(this.state.todaytime> datetoconvert && todateconvert>datetoconvert && todateconvert>this.state.todaytime){
      this.setState({
         statustrips: "Current"
         
        })
        console.log("Current")
        // alert("current")
     }
     else if(this.state.todaytime<datetoconvert){
       this.setState({
         statustrips: "Upcoming"
        })
       console.log("upcoming")
      //  alert("upcoming")
     }
     else {
       this.setState({
         statustrips: "Completed"
        })
        console.log("Completed")
        // alert("Completed")
     }
  };
  explorememberdata(timestamp){
    console.log("exploremembercalled")
  let explorememberlist =  firebase.database().ref('exploredata').child(timestamp).child("memberlist")
  explorememberlist.set(
      profilenamearray
  )
  // profilenamearray = []
}
  tripmembers(timestamp){
      console.log(timestamp)
    let membertripsadd =  firebase.database().ref('userlist').child(this.state.useriddata).child('mytrips').child(timestamp).child("memberstrips")
    membertripsadd.set(
        profilenamearray
    )
    // profilenamearray = []
  }

 
  addtrip(){
    console.log("nedated", this.state.todaytime)
    console.log("nedatedgenerated", datetoconvert)
    // if(this.state.todaytime>datetoconvert && this.state.todaytime<todateconvert){
    //   // this.setState({
    //   //   statustrips: "Current"
    //   // })
    //   console.log("")
    // }
    // else if(this.state.todaytime<datetoconvert && datetoconvert<todateconvert){
    //   // this.setState({
    //   //   statustrips: "Upcoming"
    //   // })
    //   console.log("upcoming")
    // }
    // else{
    //   console.log("Completed")
    // }

    console.log("addtripimage", this.state.tripbackground)
    let timestamp = Number(new Date());
    
   let mytripskey =  firebase.database().ref('userlist').child(this.state.useriddata).child('mytrips').child(timestamp)
//    console.log(mytripskey)
    mytripskey.set({
        Triptitle: this.state.tripname,
        place: this.state.places,
        fromdata: datetoconvert,
        todate: todateconvert,
        keyid : timestamp,
        tripbackground: this.state.tripbackground,
        tripstatus: this.state.statustrips
        // keydata: mytripskey.key
      })
   
      .then(()=>{
        console.log("dnajkdnas",this.state.statustrips)
        this.tripmembers(timestamp)
    })
    //   .then((snapshot) => {
    //     var key = snapshot.key; // "ada"
    //     console.log(key)
    //     // var childKey = snapshot.child("name/last").key; // "last"
    //   });

    let exploredata = firebase.database().ref('exploredata').child(timestamp)
    exploredata.set({
      Triptitle: this.state.tripname,
      place: this.state.places,
      fromdata: datetoconvert,
      todate: todateconvert,
      keyid : timestamp,
      tripbackground: this.state.tripbackground,
      tripstatus: this.state.statustrips
      // keydata: mytripskey.key
    })
    .then(()=>{
        // this.tripmembers(timestamp)
         this.explorememberdata(timestamp)
    })
    // AsyncStorage.removeItem("useriddata").then((value) => {
    //     this.setState({"useriddata": value});
    // }).done();
    AsyncStorage.removeItem('tripsname')
    AsyncStorage.removeItem('placesdata')
    AsyncStorage.removeItem('fromdatesync')
    AsyncStorage.removeItem('todatesync')
    AsyncStorage.removeItem('backimageurl')
    Actions.mytrip()
  }

  getimage(){
   
    ImagePicker.showImagePicker(options, (response) => {
      // const image = currentImage.uri
      let image = response.uri
      console.log(image)
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob
   
     
      // let uploadBlob = null
      let timestampdata = Number(new Date());
      const imageRef = firebase.storage().ref(timestampdata.toString())
      console.log("gotfirabe", imageRef)
      let mime = 'image/jpg'
      fs.readFile(image, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          // uploadBlob = blob
          console.log(blob)
          return imageRef.put(blob._ref, { contentType: mime })
        })
        .then(() => {
          console.log("camehere")
          // uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          console.log(url)
          this.setState({
            tripbackground: url
          })
          // URL of the image uploaded on Firebase storage
          console.log(url);
          AsyncStorage.setItem('backimageurl',  JSON.stringify(this.state.tripbackground));
        })
        .catch((error) => {
          console.log(error);
   
        })  
    });

  }
  
  render() {
      console.log(this.props.profilename)
      console.log("profiledata",profilenamearray)
      console.log("dataconsole", this.state.useriddata)
      console.log("status",this.state.statustrips)
   
    return (
      <ScrollView>
              <TextInput
        placeholder = {'Trip Title'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) =>this.tripnamecall(text)}
        value={this.state.tripname}
      />
      <TextInput
        placeholder = {'Place'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.placecall(text)}
        value={this.state.places}
      />
          <TextInput
             onFocus = {this._showDateTimePicker}
            placeholder = {'From'}
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            // onChangeText={(text) => this.setState({mobile: text})}
            value={this.state.fromdate}
      />
       <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
               <TextInput
             onFocus = {this._showDateTimePickerto}
            placeholder = {'To'}
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            // onChangeText={(text) => this.setState({mobile: text})}
            value={this.state.todate}
      />
       <DateTimePicker
          isVisible={this.state.isDateTimePickerVisibleto}
          onConfirm={this._handleDatePickedto}
          onCancel={this._hideDateTimePickerto}
        />
        <View>
            {
                profilenamearray.map((items,i) => {
                    console.log("profileitems",items)
                    return(
                      <View>
                        <Text>
                            {items.namedata}
                        </Text>
                        </View>
                    )
                })
            }
            
        </View>
        <TouchableOpacity onPress= {()=>this.getimage()}><Text>Trip Background</Text></TouchableOpacity>
        <TouchableOpacity onPress = {()=> Actions.searchmembers()}><Text>Add Members</Text></TouchableOpacity>
        <TouchableOpacity onPress = {()=>this.addtrip()}><Text>Add Trips</Text></TouchableOpacity>
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

export default createTrips