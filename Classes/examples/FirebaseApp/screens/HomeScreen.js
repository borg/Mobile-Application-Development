import React, {Component} from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';

export default class  HomeScreen extends Component {

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

  render(){
    const {navigation} = this.props;
    const {user} = this.state;

    return (
      <View style={globalStyle.container}>
        <View style={globalStyle.block}>
          <Text style={globalStyle.paragraph}>
           Hey there {user.displayName}!!
          </Text>

        </View>
      </View>
    );
  }
}


