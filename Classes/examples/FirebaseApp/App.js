import React, {Component} from 'react';
import { Pressable, View, Text, Button,LogBox } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from './common/globalState';

import auth from '@react-native-firebase/auth';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import TodoScreen from './screens/TodoScreen';
import TodoDetailScreen from './screens/TodoDetailScreen';
import GalleryScreen from './screens/GalleryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


LogBox.ignoreAllLogs();//use with caution

class TodoStack extends Component{
  state={
    
  }
  render(){
    return (

        <Stack.Navigator
          screenOptions={{}}
          initialRoute="Todos"
        >
          <Stack.Screen name="Todos" component={TodoScreen} />
          <Stack.Screen name="TodoDetailScreen" 
          component={TodoDetailScreen} 
          options={{
            /*headerRight: () => (
            <Pressable
              onPress={() => alert('This is a button!')}
  
              style={{marginRight:10}}
            >Done</Pressable>
          ),*/
          }}/>

        </Stack.Navigator>

    );
  }
}


const OnboardingStack = ()=>{
  return (<Stack.Navigator>
    <Stack.Screen 
      name="SignIn" 
      component={SignInScreen} 
      options={{
        headerTransparent: false 
      }} 

    />

    <Stack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
      options={{
        headerTransparent: false 
      }} 

    />

  </Stack.Navigator>);

}

const AuthedStack = () =>{
  return (
    <Tab.Navigator 
          screenOptions={({ route }) => (
            {
            tabBarIcon: ({ focused, color, size }) => {
              return null;
            },
            headerShown:route.name != 'Todos'
          })}
          tabBarOptions={{
            activeTintColor: 'cyan',
            inactiveTintColor: 'gray',
            
          }}
          
          
          >

          <Tab.Screen name="Home" component={HomeScreen}  />
          <Tab.Screen name="User" component={SignInScreen} options = {{}} />

          <Tab.Screen name="Todos" component={TodoStack} options = {{}} />
          <Tab.Screen name="Gallery" component={GalleryScreen} options = {{}} />

        </Tab.Navigator>
  )
}

export default class App extends Component {

  state={
    user: asGlobalState('user',null) 
  }
      //ensure you add this component as listener to global state
  async componentDidMount(){
      addGlobalStateListener("user",this);


      //added initial check auth
      if(auth().currentUser){
        setGlobalState({user:auth().currentUser});
      }
  }
  //ensure you remove the listener when unmounted
  componentWillUnmount(){
      removeGlobalStateListener("user",this);
  }


  render(){

    const {user} = this.state;

    return (
      <NavigationContainer>

        {user?(
          <AuthedStack/>
        ):(
          <OnboardingStack/>
        )}
      </NavigationContainer>
    );
  }
}

