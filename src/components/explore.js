import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput,AsyncStorage,FlatList } from 'react-native';
import {fetchPosts} from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import store from '../redux/store'
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import TimeAgo from 'react-native-timeago';
let explorecard
class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      exploredatalist: '',
      nodata: false
    };
  }
  componentWillMount(){
    exploreResultArray = []
    explorecard = firebase.database().ref('exploredata');
    explorecard.on('value', snapshot=> {
      console.log("smapdata",snapshot)
      let exploredata= snapshot._value
      exploredata!=="" && exploredata !== null?
      exploreResultArray = Object.keys(exploredata).map(function(e){
          return exploredata[e]
      })
      :this.setState({nodata: true})
      // console.log(exploreResultArray)
      this.setState({
        exploredatalist: exploreResultArray
      })
    })
  }
  render() {
    //   console.log("dataconsole", this.state.useriddata)
    // console.log(this.state.exploredatalist)
    return (
      <ScrollView>
        
           
        {
          this.state.nodata?
          <View><Text>no data found</Text></View>
          :null
        }
         <FlatList
          data={this.state.exploredatalist}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style = {{
            margin: 10
          }}>
            <View style = {{
              flexDirection: 'row',
              marginBottom: 10
            }}>
              <View style = {{ borderRadius: 50,overflow: 'hidden',  width: 50,
                height: 50,}}>
              <Image
       style={{ flexShrink: 1, flex: 1, width: null}}
      source={{uri: item.avatar}}
    />
              
              </View>
              <View style = {{flex: 2, marginTop: 8,  marginLeft: 10, alignItems: 'flex-start', justifyContent: 'flex-start'}}><Text>{item.firstname} {item.lastname}</Text><TimeAgo time={item.keyid} /></View>
              
            </View>
              <View style = {{
                flex: 1,
                height: 140,
                position: 'relative'
              }}>
              <Image
              //  blurRadius={1}
              style={{borderRadius: 5,flexShrink: 1, flex: 1, width: null}}
              source={{uri: item.tripbackground}}
              />
                <View style = {{
                flex: 3,
                backgroundColor: 'rgba(57, 70, 91, 0.53)',
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                flexDirection: 'column'
              }}>
              <View style = {{height: '100%',  justifyContent: 'center', alignItems: 'center'}}>  
                  <Text style = {{color: '#fff', fontSize: 20}}>{item.Triptitle}</Text>
              </View>
              
              {/* <Text>{fromday}th {frommonth} {fromyear} to {today}th {tomonth} {toyear}</Text>
              {
                items.memberlist !=="" && items.memberlist !== undefined ?
                Object.values(items.memberlist).map((itemmember, im)=>{
                  return(
                    <Text>{itemmember.namedata}</Text>
                  )
                })
                :null
              } */}
             
              </View>
              </View>
            
          </View>
          }
          keyExtractor={item => item.email}
        />
        
         {/* oldcode */}
        {/* {
          this.state.exploredatalist !==""?
          this.state.exploredatalist.map((items, i)=>{
            console.log(items.memberlist)

            // From
            let fromdate = items.fromdata
            let fromtimestamp = new Date(fromdate)
            let fromstring = fromtimestamp.toString().split(" ")
            // console.log(fromstring)
            let fromday = fromstring[2]
            let frommonth = fromstring[1]
            let fromyear = fromstring[3]
               // From

              //  To
              let todate = items.todate
              let tostamp = new Date(todate)
              let tostring = tostamp.toString().split(" ")
              let today = tostring[2]
              let tomonth = tostring[1]
              let toyear = tostring[3]
              console.log(tostring)
            return(
              <View style = {{
                margin: 10
              }}>
                <View style = {{
                  flexDirection: 'row',
                  marginBottom: 10
                }}>
                  <View style = {{ borderRadius: 50,overflow: 'hidden',  width: 50,
                    height: 50,}}>
                  <Image
           style={{ flexShrink: 1, flex: 1, width: null}}
          source={{uri: items.avatar}}
        />
                  
                  </View>
                  <View style = {{flex: 2, marginLeft: 10}}><Text>{items.firstname} {items.lastname}</Text></View>
                </View>
                  <View style = {{
                    flex: 1,
                    height: 140,
                    position: 'relative'
                  }}>
                  <Image
                  //  blurRadius={1}
                  style={{borderRadius: 5,flexShrink: 1, flex: 1, width: null}}
                  source={{uri: items.tripbackground}}
                  />
                    <View style = {{
                    flex: 3,
                    backgroundColor: 'rgba(57, 70, 91, 0.53)',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column'
                  }}>
                  <View style = {{height: '100%',  justifyContent: 'center', alignItems: 'center'}}>  
                      <Text style = {{color: '#fff', fontSize: 20}}>{items.Triptitle}</Text>
                  </View>
                  
                  <Text>{fromday}th {frommonth} {fromyear} to {today}th {tomonth} {toyear}</Text>
                  {
                    items.memberlist !=="" && items.memberlist !== undefined ?
                    Object.values(items.memberlist).map((itemmember, im)=>{
                      return(
                        <Text>{itemmember.namedata}</Text>
                      )
                    })
                    :null
                  }
                 
                  </View>
                  </View>
                
              </View>
            )
          }): null
        } */}

        {/* oldcode */}
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

export default Explore