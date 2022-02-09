import { StatusBar } from 'expo-status-bar';
import {Component} from 'react';
import { Image,StyleSheet, Text, View,SafeAreaView,Dimensions,TouchableHighlight} from 'react-native';
const { height, width } = Dimensions.get("screen");


import Button from './components/button'
import Footer from './components/footer'
import Link from './components/link'

import { textStyle } from './styles' 


export default class App extends Component {
  state = {
    clicked:"NO"
  }

  onPress(){
    this.setState({clicked:'YES'})
  }

  render(){
    const {clicked} = this.state;
  return (
    <SafeAreaView style={styles.container}>


      <Text style={[textStyle.main, textStyle.heading]}>Is clicked: {clicked}</Text>



     <View style={styles.flexbox}>
        <View
          style={[styles.box, { backgroundColor: "powderblue" }]}
        />
        <View
          style={[styles.box, { backgroundColor: "skyblue" }]}
        />
        <View
          style={[styles.box, { backgroundColor: "steelblue" }]}
        />
      </View>


      <Button warning onPress={()=>{this.onPress()}} label="My Button" />
      <Button error label="My Button" onPress={()=>{this.onPress()}}  />
      <Button valid label="My Button" onPress={()=>{this.onPress()}} />
      <Button disabled label="My Button" onPress={()=>{this.onPress()}} />
      <Button label="My Button" />
      <Button focus label="My Button" onPress={()=>{this.onPress()}}  />

      <Footer error label="Footer text" />


        <View style={styles.logo}>
          <TouchableHighlight onPress={()=>{
            console.log("pressed");
          }}>
          <Image  source={{uri: 'https://reactjs.org/logo-og.png'}} style={{ width: 40, height: 40 }}/>
          </TouchableHighlight>
        </View>
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
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    //flexWrap: "wrap",
  },
  flexbox:{
    width:250,
    height:250,
    backgroundColor: "aliceblue",
    justifyContent:'flex-start',//'space-between',//flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right
    flexDirection: "row",//row | row-reverse | column | column-reverse
    //alignItems: 'center',//vertical if row
   // justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  logo:{
    margin:20
  }
});
