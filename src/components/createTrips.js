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
let valurArray
let isDuplicate

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
        statustrips: '',
        userfirstname : '',
        userlastname :  '',
        avatar: '',
        description: ''
    };
    this.addtrip = this.addtrip.bind(this)
    this.tripmembers = this.tripmembers.bind(this)
    this.placecall = this.placecall.bind(this)
    this.explorememberdata  = this.explorememberdata.bind(this)
    this.getimage = this.getimage.bind(this)
    this.descriptioncall = this.descriptioncall.bind(this)
    // this.getuserdetails = this.getuserdetails.bind(this)
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
  descriptioncall(text){
    this.setState({
      description: text
    })
    AsyncStorage.setItem('descriptiodata',  JSON.stringify(this.state.description))
    console.log("descriptioncall",this.state.description)
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
    AsyncStorage.getItem("descriptiodata").then((value) => {
      console.log("valuedatadescription", value)
      this.setState({"description": JSON.parse(value)});
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
        // console.log("valuedatasync", value)
        if(value !==null){
          this.setState({"tripbackground": JSON.parse(value)});
        }
    }).done();
      if(this.props.profile !=="" && this.props.profile !== undefined){
        profilenamearray.push(this.props.profile)
        console.log("dataays", profilenamearray)
      }
    AsyncStorage.getItem("useriddata").then((value) => {
        this.setState({"useriddata": value});
        let userdata = firebase.database().ref('userlist').child(this.state.useriddata);
        userdata.on('value', snapshot=> { 
          console.log("usersnapshot", snapshot)
          this.setState({
            userfirstname : snapshot._value.firstname,
            userlastname : snapshot._value.lastname,
            avatar: snapshot._value.avatar
          })
           
          // console.log("userdatai",snapshot)
        })
    }).done();
  
 

    valurArray = profilenamearray.map(function(itemd){
      return itemd.uidkey
      //  console.log("itemsd",itemd)
    })
    isDuplicate = valurArray.some(function(itemsa, idx){
        return valurArray.indexOf(itemsa)!= idx
    })
    console.log("gotduplicate", isDuplicate)
  }
  // getuserdetails(datauser){

  //   console.log("thisdata", datauser)
  //   let userdata = firebase.database().ref('userlist').child(datauser);
  //   userdata.on('value', snapshot=> { 
  //     this.setState({
  //       userfirstname: snapshot._value.firstname,
  //       userlastname: snapshot._value.lastname
  //     })
  //     // console.log("userdatai",snapshot)
  //   })
  // }
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
  .then(()=>{
    profilenamearray = []
  })
}
  tripmembers(timestamp){
      console.log(timestamp)
    let membertripsadd =  firebase.database().ref('userlist').child(this.state.useriddata).child('mytrips').child(timestamp).child("memberstrips")
    membertripsadd.set(
        profilenamearray
    )
    .then(()=>{
      profilenamearray = []
    })
    // profilenamearray = []
  }

 
  addtrip(){


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
        tripstatus: this.state.statustrips,
        tripdescriptiondata: this.state.description
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
      tripstatus: this.state.statustrips,
      firstname: this.state.userfirstname,
      lastname: this.state.userlastname,
      avatar: this.state.avatar,
      tripdescriptiondata: this.state.tripdescription
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
    AsyncStorage.removeItem('descriptiodata')
    Actions.mytrip()
  }

  getimage(){
   
    ImagePicker.showImagePicker(options, (response) => {
      // const image = currentImage.uri
      let image = Platform.OS === 'ios' ? response.origURL : response.uri
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
    // if(this.state.useriddata!==""){
    //   this.getuserdetails(this.state.useriddata)
    // }
    return (
      <ScrollView style = {{
        backgroundColor: '#fff'
      }}>
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
        placeholder = {'Description'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        // onSelectionChange={(text)=>this.descriptioncall(text)}
        onChangeText={(text) => this.descriptioncall(text)}
        value={this.state.description}
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
             
              //   profilenamearray.map((items,i) => {
              //       console.log("profileitems",items)
              //       items!==""?
              //  items.map((itemskey, is)=>{
              //           console.log("keyitems", itemskey.namedata)
              //           return(
              //             // <View key = {is}>
              //             //   <Text>
              //             //       {itemskey.namedata}
              //             //   </Text>
              //             //   </View>
              //             <Text>{itemskey.namedata}</Text>
              //           )
              //       })
              //     :null
              //   })
              profilenamearray !== "" && profilenamearray!==null?
                profilenamearray.map((items,i) => {
                  console.log("profileitems",items)
                  return(
                              <View key = {i}>
                                <Text>
                                    {items.namedata}
                                </Text>
                                </View>
                            )
                })
                :null
            }
              <Image
              style={{width: 100, height: 100}}
              source={{uri: this.state.tripbackground}}
        />
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