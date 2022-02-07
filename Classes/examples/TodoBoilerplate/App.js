import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View,Button,TextInput,SafeAreaView} from 'react-native';

export default class App extends Component {

  render(){
    return (
      <SafeAreaView style={styles.container}>

        <Text style={styles.header}>Hello</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(txt)=>{
            console.log(txt);
          }}
        />

        <Button 
          title="Add todo"
          onPress={()=>{
            console.log("hey");
          }}
        />
      </SafeAreaView>
    );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize:24,
    fontWeight:'bold',
    margin:24
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:'90%'
  },
});
