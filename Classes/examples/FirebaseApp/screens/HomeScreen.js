import React, {Component} from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';

export default class  HomeScreen extends Component {

    state={
        todos: asGlobalState('todos',[]) 
    }
        //ensure you add this component as listener to global state
    componentDidMount(){
        addGlobalStateListener("todos",this);
    }
    //ensure you remove the listener when unmounted
    componentWillUnmount(){
        removeGlobalStateListener("todos",this);
    }

  render(){
    const {navigation} = this.props;
    const {todos} = this.state;

    return (
      <View style={globalStyle.container}>
        <View style={globalStyle.block}>
          <Text style={globalStyle.paragraph}>
           Here is your stuff
          </Text>



          
        </View>
      </View>
    );
  }
}


