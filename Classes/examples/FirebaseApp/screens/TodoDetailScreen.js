
import React,{Component} from 'react';
import { StyleSheet, Text,Pressable, View,Button,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';


import TodoItem from '../components/TodoItem';
import {Theme, globalStyle} from '../styles/Theme';

const Separator = () => (
  <View style={globalStyle.separator} />
);

export default class TodoDetailScreen extends Component {

  componentDidMount(){
    this.update();
  }
  componentDidUpdate(prevProps) {
    this.update();
  }

  update(){
    const { navigation, route} = this.props;

    let {item,onPress} = route.params;

    if(!item){
      console.log("Missing item");
      return;
    }
      navigation.setOptions({
        headerRight: () => (
          <Pressable style={{marginRight:10}} onPress={() => {
            onPress(item,!item.done);
            this.setState({anything:Math.random()});
            }} ></Pressable>
        ),
      });
  }


  render(){

    const { navigation, route} = this.props;

    let {item} = route.params;
  if(!item) {
    return (      <SafeAreaView style={globalStyle.container}>

        <Text style={globalStyle.header}>Missing item</Text>

      </SafeAreaView>)
  }
    return (
      <SafeAreaView style={globalStyle.container}>

        <Text style={globalStyle.header}>{item.title}</Text>
        {item.done?(
          <Text style={globalStyle.body}>Done</Text>
        ):(
          <Text style={globalStyle.body}>Pending</Text>
        )}
        <Text style={globalStyle.body}>{item.body}</Text>
      </SafeAreaView>
    );
      }
}
