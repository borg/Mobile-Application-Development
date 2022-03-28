
import React,{Component} from 'react';
import { StyleSheet, Text, View,Button,TextInput, Pressable} from 'react-native';
import {Theme, globalStyle} from 'styles/Theme';
//needs to be installed with expo install expo-checkbox


export default class TodoItem extends Component {

  render(){
      const {item,onPress, navigation} = this.props;

    return (
      <View style={styles.container}>
       
      
        <Pressable 
        style={{width:'100%'}}
        onPress={()=>{
          navigation.navigate("TodoDetailScreen",{item:item,onPress:onPress})
        }}
        >
          <Text style={item.done?styles.textDone:styles.text}>{item.title}</Text></Pressable>
      </View>
    );
      }
}

const defText = {
    height: 40,
    marginLeft:10,
    width:'80%',
    color:'#333'
  }

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    marginLeft:10,
    width:'100%'
  },
  text: defText,
  textDone:{
      ...defText,
      color:'#CCC'
  }
});
