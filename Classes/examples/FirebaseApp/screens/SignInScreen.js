import React, {Component} from 'react';
import { Button, Text, View, StyleSheet,Image,Pressable } from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';

import auth from '@react-native-firebase/auth';

import { GoogleSignin, GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin';
import * as ggl from './GoogleConfig';
const GoogleBtnImg = require('../assets/btn_signin_google.png');


export default class  Screen extends Component {

    state={
        user: asGlobalState('user',null) 
    }
        //ensure you add this component as listener to global state
    componentDidMount(){
        addGlobalStateListener("user",this);
    }
    //ensure you remove the listener when unmounted
    componentWillUnmount(){
        removeGlobalStateListener("user",this);
    }


    async signIn  () {

        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();

          console.log(userInfo);
          //this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
    };

    async signOut(){
        setGlobalState({user:null});
    }
      

  render(){
    const {navigation} = this.props;
    const {user} = this.state;

    return (
      <View style={globalStyle.container}>
        {user?(
            <View style={globalStyle.block}>
                <Pressable onPress={()=>this.signOut()} ><Text>Sign out</Text></Pressable>
            </View>

        ):(
            <>
                <Pressable onPress={this.signIn}>
                    <Image source={GoogleBtnImg} />
                </Pressable>

                <View style={globalStyle.block}>
                    <Pressable onPress={()=>navigation.navigate("SignUp")} ><Text>Goto sign up</Text></Pressable>
                </View>
            </>
        )}
      </View>
    );
  }
}


