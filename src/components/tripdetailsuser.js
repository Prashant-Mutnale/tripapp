import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { fetchPosts } from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import store from '../redux/store'
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class tripDetailsuser extends React.Component {
    constructor() {
        super();
        this.state = {
            useriddata: '',
            tripsdata: '',
            tripmemberslist: '',
            userTripdetails: ''
        };
        // this.gettripdetails = this.gettripdetails.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentWillMount(){
        console.log(this.props.tripid)
        let exploredetails = firebase.database().ref('exploredata').child(this.props.tripid);
        exploredetails.on('value',snapshot=>{
            console.log(snapshot._value)
            this.setState({
                userTripdetails: snapshot._value
            })
        })
    }
    handleScroll(event){
        console.log(event.nativeEvent.contentOffset.y);
        this.props.parentdata(event.nativeEvent.contentOffset.y)
    }
    render() {
           console.log("maincsss",this.state.userTripdetails)
           console.log("tripsmemberlist", this.state.userTripdetails)
           console.log(this.state.userTripdetails.place)
           let dateString = new Date(this.state.userTripdetails.todate)
           console.log("datedatta", dateString)
           let todatetimestamp = dateString.toString().split(" ")
           console.log(todatetimestamp)
           let datenumto = todatetimestamp[2]
           let monthto = todatetimestamp[1]
           let yearto = todatetimestamp[3]
           console.log(datenumto)
           console.log(monthto)
           console.log(yearto)
   
           let datefromString = new Date(this.state.userTripdetails.fromdata)
           console.log("datedattafrom", datefromString)
           let fromtimestamp = datefromString.toString().split(" ")
           let fromdate = fromtimestamp[2]
           let frommonth = fromtimestamp[1]
           let fromyear = fromtimestamp[3]
           console.log(fromdate)
           console.log(frommonth)
           console.log(fromyear)
        return ( 
           <ScrollView onScroll={this.handleScroll} scrollEventThrottle={16}>
                <View>
                <Image
                    style = {{ width: 400, height: 500 } }
                    source = {{ uri: this.state.userTripdetails.tripbackground } }
            /> 
               <View style = { {
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(57, 70, 91, 0.53)',
                    // backgroundColor: 'red'
                }
            } >
            <View style = {{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }
            } >
           
           <Text style = {
                { color: '#fff', fontSize: 30 } } > { this.state.userTripdetails.Triptitle } </Text> 
                <Text style = {
                { color: '#fff' } } > { this.state.userTripdetails.place } </Text> <Text style = {
                { color: '#fff' } } > { fromdate }
            th { frommonth } { fromyear } - { datenumto }
            th { monthto } { yearto } </Text>

            </View>

            </View>
                </View>
                <View >
            <Text style = {
                { color: '#6E747F', fontSize: 14, lineHeight: 30, textAlign: 'left', margin: 30 } } > { this.state.userTripdetails.tripdescriptiondata } </Text> 
                </View> 
                <View style = {
                { marginLeft: 20 } } > < Text style = {
                { fontSize: 25 } } > Participants </Text></View> {
                this.state.userTripdetails !== "" ?
                Object.values(this.state.userTripdetails.memberlist).map((items, i) => {
                    console.log("dataitems", items)
                    return ( <View style = {
                            { flexDirection: 'row', margin: 20 } } >
                        <View style = {
                            {
                                borderRadius: 50,
                                overflow: 'hidden',
                                width: 50,
                                height: 50
                            }
                        } >
                        <Image style = {
                            { flexShrink: 1, flex: 1, width: null } }
                        source = {
                            { uri: items.profileavatar } }
                        /> </View>

                        <View style = {
                            { flex: 3, justifyContent: 'flex-start', marginLeft: 10 } } >
                            <Text style = {
                            { fontSize: 16 } } > { items.namedata } </Text></View> { /* <Text>{items.namedata}</Text> */ } { /* {items.uidkey !== ""?this.getpartlist(items.uidkey):null}  */ } </View>
                    )
                }) :null}
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

export default tripDetailsuser