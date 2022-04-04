
import React,{Component} from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';
import TodoItem from '../components/TodoItem';
import firestore from '@react-native-firebase/firestore';

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
  async componentDidMount(){
      addGlobalStateListener("todos",this);

      await this.loadRemoteData();
  }
  //ensure you remove the listener when unmounted
  componentWillUnmount(){
      removeGlobalStateListener("todos",this);
  }

  async loadRemoteData(){
    const todos = await firestore().collection('app').doc('todos').get() 
    .then(documentSnapshot => {
      //console.log('Todos exists: ', documentSnapshot.exists);
  
      if (documentSnapshot.exists) {
        const todos = documentSnapshot.data();
        //console.log('Todos data: ', todos.data);
        setGlobalState({todos:todos.data});
      }
    });

  }

  async saveRemoteData(){
    let {todos} = this.state;

    try{
      firestore()
      .collection('app')
      .doc('todos')
      .set({data:todos})
      .then(() => {
        console.log('Todos saved');
      });
    }
    catch(e){
      console.log(e.message);
    }
  }

  async addTodo(){
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

    setGlobalState({todos});

    this.setState({currentTitle:'',currentBody:''},async()=>{
      await this.saveRemoteData();
    });
  }

  async setDone(item, v){
    let {todos} = this.state;
    for(let i in todos){
      let itm = todos[i];
      if(itm === item){
        todos[i].done = v;
      }

    }

    //this.setState({todos});
    setGlobalState({todos});//missing callback here...not ideal

    await this.saveRemoteData();
  }

  async clearList(){
    setGlobalState({todos:[]});
    await this.saveRemoteData();
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
             key={index}
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

          style={{...globalStyle.input,height:80,width:'90%',marginLeft:15}}
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
                this.clearList();
              }}
              style={globalStyle.roundButton}>
            <Text>Clear list</Text>
            </TouchableOpacity>
    </View>
      </SafeAreaView>
    );
      }
}
