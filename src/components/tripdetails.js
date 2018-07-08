import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { fetchPosts } from '../redux/actions/postActions';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import store from '../redux/store'
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
let tripdetailscard
class tripDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            useriddata: '',
            tripsdata: '',
            tripmemberslist: ''
        };
        // this.gettripdetails = this.gettripdetails.bind(this)
        this.getpartlist = this.getpartlist.bind(this)
    }
    componentWillMount() {
        AsyncStorage.getItem("useriddata").then((value) => {
            this.setState({ "useriddata": value });
            console.log(this.state.useriddata)
            this.gettripdetails(this.state.useriddata, this.props.keyiddata)
        }).done();
        // console.log(this.props.keyiddata)
    }
    gettripdetails(useriddatagot, keyiddata) {
        tripdetailscard = firebase.database().ref('userlist').child(useriddatagot).child('mytrips').child(keyiddata);
        tripdetailscard.on('value', snapshot => {
            console.log(snapshot)
            this.setState({
                tripsdata: snapshot._value
            })
        })
    }
    getpartlist(tripid) {
        console.log(tripid)
        let tripsmembers = firebase.database().ref('userlist').child(tripid);
        tripsmembers.on('value', snapshot => {
            this.setState({
                tripmemberslist: snapshot._value
            })
        })
    }
    componentDidMount() {

    }

    render() {
        console.log("tripsmemberlist", this.state.tripmemberslist)
        console.log(this.state.tripsdata.place)
        let dateString = new Date(this.state.tripsdata.todate)
        console.log("datedatta", dateString)
        let todatetimestamp = dateString.toString().split(" ")
        console.log(todatetimestamp)
        let datenumto = todatetimestamp[2]
        let monthto = todatetimestamp[1]
        let yearto = todatetimestamp[3]
        console.log(datenumto)
        console.log(monthto)
        console.log(yearto)

        let datefromString = new Date(this.state.tripsdata.fromdata)
        console.log("datedattafrom", datefromString)
        let fromtimestamp = datefromString.toString().split(" ")
        let fromdate = fromtimestamp[2]
        let frommonth = fromtimestamp[1]
        let fromyear = fromtimestamp[3]
        console.log(fromdate)
        console.log(frommonth)
        console.log(fromyear)
            // console.log("fromtimestamp",tofromtimestamp)
        return ( 
        <ScrollView style = {{ backgroundColor:'#fff'}}>
            <View style = {{ position: 'relative', height: 300 } } >
            <Image
            style = {{ width: 400, height: 300 } }
            source = {{ uri: this.state.tripsdata.tripbackground } }
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
                { color: '#fff', fontSize: 30 } } > { this.state.tripsdata.Triptitle } </Text> <Text style = {
                { color: '#fff' } } > { this.state.tripsdata.place } </Text> <Text style = {
                { color: '#fff' } } > { fromdate }
            th { frommonth } { fromyear } - { datenumto }
            th { monthto } { yearto } </Text>

            </View>

            </View>

            </View>

            {
                /*      
                            {
                          this.state.tripsdata!==""?
                          Object.values(this.state.tripsdata.memberstrips).map((items, i) => {
                            // console.log("dataitems",items)
                            return(
                              <View style = {{flexDirection: 'row'}}>
                                <Text>{items.namedata}</Text>
                              </View>
                            )
                          })
                          :null
                        } */
            } <View >
            <Text style = {
                { color: '#6E747F', fontSize: 14, lineHeight: 30, textAlign: 'left', margin: 30 } } > { this.state.tripsdata.tripdescriptiondata } </Text> 
                </View> 
                <View style = {
                { marginLeft: 20 } } > < Text style = {
                { fontSize: 25 } } > Participants </Text></View> {
                this.state.tripsdata !== "" ?
                Object.values(this.state.tripsdata.memberstrips).map((items, i) => {
                    console.log("dataitems", items)
                    return ( 
                    <TouchableOpacity 
                    onPress={()=>Actions.userprofile({keyuser:items.uidkey})}
                    style = {
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
                            { fontSize: 16 } } > { items.namedata } </Text></View> { /* <Text>{items.namedata}</Text> */ } { /* {items.uidkey !== ""?this.getpartlist(items.uidkey):null}  */ } 
                            </TouchableOpacity>
                    )
                }) :null
            } </ScrollView>
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

export default tripDetails