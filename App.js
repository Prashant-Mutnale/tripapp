import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import {Provider, connect} from 'react-redux';
import store from './src/redux/store'
import {Actions, Scene, Router, tabs, NavBar} from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Signup from './src/components/signup'
import Signin from './src/components/signin'
import Home from './src/components/home'
import myTrips from './src/components/myTrips'
import Explore from './src/components/explore'
import Favourites from './src/components/Favourites'
import createTrips from './src/components/createTrips'
import searchMembers from './src/components/participants'
import tripDetails from './src/components/tripdetails'
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      useriddata: ''
    }
    this._signout=this._signout.bind(this)
  }
  componentWillMount(){
    
    AsyncStorage.getItem("useriddata").then((value) => {
      console.log("valued",value)
      this.setState({"useriddata": value});
      if(this.state.useriddata !=="" && this.state.useriddata !== null){
        Actions.mytrip()
      }
      else{
        Actions.signin()
      }
  }).done();
  }
  _signout(){
    console.log("gotsignout")
    AsyncStorage.removeItem('useriddata')
    Actions.signin()
  }
  render() {
    
    const scenes = Actions.create(
      <Scene key="root">
        <Scene key="signin" component={Signin} title="Signin" renderBackButton={()=><View/>}/>
        <Scene key="signup" component={Signup} title="Signup"/>
        {/* <Scene key="home" component={Home} title="Home" tabBar tabBarPosition="top">
                        <Scene  key="mytrip"
                          title="MyTrips"
                          iconName="tags"
                          // icon={TabIcon}
                          // hideNavBar={true}
                          component={myTrips}
                          initial={true}
                  />
                  <Scene  key="explore"
                          title="Explore"
                          iconName="newspaper-o"
                          // icon={TabIcon}
                          // hideNavBar={true}
                          component={Explore}
                   />

                    <Scene  key="favourites"
                            iconName="gear"
                            // icon={TabIcon}
                            // hideNavBar={true}
                            title={Favourites}
                            component={Favourites} />
        </Scene> */}
        <Scene key="home"  tabs={true}
        showIcon={false}
        rightTitle='Sign out'
        tabBarStyle={{paddingTop: 0, marginTop: 0}}
        hideNavBar
        tabBarPosition={'bottom'}
        >
        <Scene  renderBackButton={()=><View/>} key="mytrip"
                          title="MyTrips"
                          // iconName="tags"
                          // icon={TabIcon}
                          showIcon={false}
                          component={myTrips}
                          initial={true}
                          onRight={this._signout}
                          rightTitle='Sign out'
                          
                         
                         
                          
                  />
                  <Scene  renderBackButton={()=><View/>} key="explore"
                          title="Explore"
                          showIcon={false}
                          onRight={this._signout}
                          rightTitle='Sign out'
                          
                         
                          // iconName="newspaper-o"
                          // icon={TabIcon}
                          component={Explore}
                   />

                    <Scene  renderBackButton={()=><View/>} key="favourites"
                    // showIcon={false}
                    onRight={this._signout}
                    rightTitle='Sign out'
                            // iconName="gear"
                            // icon={TabIcon}
                            title={Favourites}
                            component={Favourites} />
                 </Scene>
                 <Scene key="createtrips" rightTitle='Sign out' component={createTrips} title="Create Trip" onRight={this._signout}/>
                 <Scene key="searchmembers" rightTitle='Sign out' component={searchMembers} title="Search" rightTitle='Sign out' onRight={this._signout} onRight={this._signout}/>
                 <Scene key="tripsdetails" rightTitle='Sign out' component={tripDetails} headerTintColor="#fff" title="Trip Details" navigationBarStyle={{ backgroundColor: 'transparent', position: 'absolute', top: 0}} onRight={this._signout}/>
        {/* <Scene key="register" component={Register} title="Register"/>
        <Scene key="home" component={Home}/> */}
      </Scene>
       
    );
    return (
      <Provider store = {store}>
          <Router  scenes={scenes}/>  
     </Provider>
      // <ScrollView>
      //   <View style={styles.container}>
      //   <TouchableOpacity 
      //   style = {{
      //     marginTop: 30
      //   }}
      //   onPress = {()=>this.login()}><Text>click login button</Text></TouchableOpacity>
      //   </View>
      //   {/* <TouchableOpacity onPress = {()=>this.onLoginOrRegister()}><Text>fblogin</Text></TouchableOpacity>     */}
      // </ScrollView>
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
