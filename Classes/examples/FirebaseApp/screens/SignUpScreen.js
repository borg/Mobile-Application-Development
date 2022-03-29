import React, {Component} from 'react';
import { Button, Text, View, Image,StyleSheet,Pressable} from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';


import auth from '@react-native-firebase/auth';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';

const GoogleBtnImg = require('../assets/btn_signin_google.png');
import * as ggl from './GoogleConfig';
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

    //notice that signUp and signIn methods are the same
    async signUp  () {
        
        
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          
          console.log(userInfo);
          const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
          console.log("googleCredential",googleCredential);
 
          let res = await auth().signInWithCredential(googleCredential);
 
          console.log("res",res);

          
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
          console.log(error.message);
          return;
        }

        //this will cause a render and the authenticated user will exist for react navigator
        setGlobalState({user:auth().currentUser});
      };

      

  render(){
    const {navigation} = this.props;
    const {user} = this.state;

    return (
      <View style={globalStyle.container}>
        <Pressable onPress={this.signUp}>
            <Image source={GoogleBtnImg} />
        </Pressable>

        <View style={globalStyle.block}>
            <Pressable onPress={()=>navigation.navigate("SignIn")} ><Text>Goto sign in</Text></Pressable>
        </View>
      </View>
    );
  }
}


