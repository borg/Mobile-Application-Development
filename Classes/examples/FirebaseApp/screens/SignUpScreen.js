import React, {Component} from 'react';
import { Button, Text, View, Image,StyleSheet,Pressable} from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';

import { GoogleSignup, GoogleSignupButton,statusCodes } from '@react-native-google-signin/google-signin';

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


    async signUp  () {

        setGlobalState({user:{name:"Bob"}});

        return;
        try {
          await GoogleSignup.hasPlayServices();
          const userInfo = await GoogleSignup.signIn();
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


