
import React,{Component} from 'react';
import { StyleSheet, Text, View,Button,Pressable,TextInput,SafeAreaView,Image,RefreshControl, ScrollView} from 'react-native';
import {Theme, globalStyle} from '../styles/Theme';
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';


import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';



const Separator = () => (
  <View style={globalStyle.separator} />
);

export default class TodoScreen extends Component {
  state = {
    isUploading:false,
    remoteImages:[]
  };


  async componentDidMount(){
      await this.loadRemoteData();
  }

  componentWillUnmount(){
  }

  async loadRemoteData(){
      let remoteImages =[];
    try{
    // const url = await storage().ref('images/profile-1.png').getDownloadURL();

        const reference = storage().ref();//
    
        let list = await this.listFilesAndDirectories(reference);
        console.log('Finished listing',list);
        for(let ref of list){
            const url = await ref.getDownloadURL();
            remoteImages.push(url);//should check array length before doing this
        }
        console.log("remoteImages",remoteImages);
        this.setState({remoteImages});
    }
    catch(e){
        console.log("Image listing error",e.message);
    }
  }

  async listFilesAndDirectories(reference, pageToken) {
      let list = [];
    return reference.list({ pageToken }).then(result => {
      // Loop over each item
      /*
      result.items.forEach(ref => {
        console.log(ref.fullPath);
      });
        */
      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }
  
      return Promise.resolve(result.items);
    });
  }

  async openImagePicker() {

    let image = await ImagePicker.openPicker({
    width: 500,
    height: 500,
    cropping: true,
    includeBase64: true,
    });

    if (image) {



        try {
            this.setState({isUploading: true});
            console.log(image,"ImagePicker");

            //'data:image/png;base64,'+image.data; here is already base64 if you're into that

            if (image.size > 2000000) {
                //TODO: Notify user to try smaller image
                console.log("Image rejected too big");
                this.setState({isUploading: false});
                return;
            }
            /*
            uri: image.path,
            name: image.filename,
            type: image.mime,
             */

            // create bucket storage reference to not yet existing image
            const reference = storage().ref(image.filename);

            // path to existing file on filesystem

            // uploads file
            await reference.putFile(image.path);


            await this.loadRemoteData();
            this.setState({isUploading: false});
        } catch (e) {
            console.log("Image upload error",e.message);
            this.setState({isUploading: false});
        }
    };
}


  




  async saveRemoteData(){
    let {todos} = this.state;

    try{
      
        
    }
    catch(e){
      console.log(e.message);
    }
  }


  render(){
    const {remoteImages,isUploading} = this.state;

    const { navigation, route} = this.props;

    return (
      <SafeAreaView style={globalStyle.container}>

        <Text style={globalStyle.header}>Gallery</Text>



          <View style={globalStyle.row}>
                <Pressable
                onPress={()=>{
                    this.openImagePicker();
                }}
                style={globalStyle.roundButton}>
                <Text>Add image</Text>
                </Pressable>
            </View>
            <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isUploading}
                    //onRefresh={onRefresh}
                />
                }
            >
            <View style={globalStyle.row}>
                {
                    remoteImages.map((img,i)=>{
                        return <Image key={i} source={{uri:img}} 
                             style={{ width: 100, height: 100, margin: 10 }}
                        />
                    })
                }
            </View>
            </ScrollView>
            
      </SafeAreaView>
    );
      }
}
