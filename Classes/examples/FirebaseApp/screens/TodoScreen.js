
import React,{Component} from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';
import TodoItem from '../components/TodoItem';


const Separator = () => (
  <View style={globalStyle.separator} />
);

export default class TodoScreen extends Component {
  state = {
    currentTitle:'',
    currentBody:'',
    todos: asGlobalState('todos',[]) 
  };

      //ensure you add this component as listener to global state
    componentDidMount(){
        addGlobalStateListener("todos",this);
    }
    //ensure you remove the listener when unmounted
    componentWillUnmount(){
        removeGlobalStateListener("todos",this);
    }

  addTodo(){
    const {currentBody,currentTitle} = this.state;
    if(currentTitle.length==0){
      return;
    }

    let {todos} = this.state;

    let item = {
      uid:todos.length,
      title:currentTitle,
      body:currentBody,
      done:false
    }

    todos.push(item);
    this.setState({currentTitle:'',currentBody:''});
    setGlobalState({todos});
  }

  setDone(item, v){
    let {todos} = this.state;
    for(let i in todos){
      let itm = todos[i];
      if(itm === item){
        todos[i].done = v;
      }

    }
  console.log("set done",item)
    //this.setState({todos});
    setGlobalState({todos});
  }

  render(){
    const {todos,currentBody,currentTitle} = this.state;
    const { navigation, route} = this.props;

    return (
      <SafeAreaView style={globalStyle.container}>

        <Text style={globalStyle.header}>To-do list</Text>


        {
            todos.map((e,index)=>{
             return( <TodoItem 
             item={e} 
             navigation={navigation}
             onPress={(item,value)=>{
               this.setDone(item,value);
             }} />)

            })
        }


        <Separator />
        <Text style={{alignSelf:'flex-start',marginLeft:'5%'}}>Title</Text>
        <TextInput 
          style={globalStyle.input}
          value={currentTitle}
          onChangeText={(txt)=>{

            this.setState({currentTitle:txt});
          }}
        />

         <Text style={{alignSelf:'flex-start',marginLeft:'5%',marginBottom:5}}>Body</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}

          style={{...globalStyle.input,height:80,border:'#000 solid 1px',width:'90%',marginLeft:15}}
          value={currentBody}
          onChangeText={(txt)=>{

            this.setState({currentBody:txt});
          }}
        />


          <View style={globalStyle.row}>
            <TouchableOpacity
            onPress={()=>{
                this.addTodo();
              }}
              style={globalStyle.roundButton}>
            <Text>Add to-do</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{
                this.setState({todos:[]});
              }}
              style={globalStyle.roundButton}>
            <Text>Clear list</Text>
            </TouchableOpacity>
    </View>
      </SafeAreaView>
    );
      }
}
