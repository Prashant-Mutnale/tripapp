import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, ListView, TextInput,AsyncStorage } from 'react-native';
import {fetchPosts} from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import store from '../redux/store'
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import DateTimePicker from 'react-native-modal-datetime-picker';
let datetoconvert
let todateconvert
let key
let listuserarray
let arraylist = []
class searchMembers extends React.Component {
  constructor() {
    super();
    this.state = {
        members: '',
        listeduser: '',
        selectedtext: []
    };
    // this.addmembers = this.addmembers.bind(this)
    // this.searchdata = this.searchdata.bind(this)
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // this.state = {
    //     dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    //   };
    this.changeselected = this.changeselected.bind(this)
  }
//   searchdata(itemsref){
//     itemsref.on('value', (snap) => {
//         let items = [];
//         snap.forEach(element => {
//             items.push({
//                 firstname: element.val().firstname
//             })
//         });
//     })
//   }
changeselected(iddata, nameid){
  arraylist.push ({iddata,nameid})
  this.setState({
    selectedtext: arraylist
  })


  console.log("array", arraylist)
}
componentWillMount(){
    let resultleavearray = []
    let usersearch = firebase.database().ref('userlist');
    usersearch.on('value', snapshot=> {
        console.log(snapshot)
       let  listuser = snapshot._value
       resultleavearray = Object.keys(listuser).map(function(e){
           return listuser[e]
       })
       this.setState({
        listeduser: resultleavearray
       })
       console.log(resultleavearray)
     
    // console.log(snapshot)
});
}
  render() {
      console.log(this.state.members)
      console.log("datauser", this.state.listeduser)
    return (
        <ScrollView>
        <View>
              <TextInput
                placeholder = {'Search members'}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({members: text})}
                value={this.state.members}
            />
            <View>
            {/* <ListView
            
                dataSource={this.state.dataSource}
                renderRow={(data) => <View><Text>{data}</Text></View>}
            /> */}
            </View>
            {/* <TouchableOpacity onPress = {()=>this.searchdata()}><Text>clickme</Text></TouchableOpacity> */}
            {
                this.state.listeduser !==""? 
                this.state.listeduser.map((items, i) => {
                  let datsort = this.state.selectedtext.filter((items4) => {
                      return items4.iddata===items.uid
                  })
                    console.log("items",items)
                    return(
                        <TouchableOpacity 
                        // onPress = {()=>this.changeselected(items.uid, items.firstname)}
                        key = {i} 
                        onPress = {()=>Actions.createtrips({profile:{namedata: items.firstname, uidkey: items.uid}})}
                        >
                         {/* <TouchableOpacity key = {i} onPress = {()=>Actions.createtrips({profile:items.firstname})}>    */}
                        <Text>{items.firstname}</Text>
                        <Text>{datsort.length>0?"selected":"select"}</Text>
                        </TouchableOpacity>
                    )
                })
                : null
            }
           
        </View>
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

export default searchMembers