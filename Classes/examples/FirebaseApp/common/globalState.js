/*
The simplest form of global state management.

If you want the simple life, and can't be bothered with
abstractions and the hipness of hooks ;-)

Use at own risk though, as it's calling setState on local components
in a very non-reacty way, and may not be supported in future releases.

It's using a simple old fashioned global dispatch pattern.

Usage:

import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from 'common/globalState';

class Profile extends Component {
    state = {
        authUser: asGlobalState('authUser',null) //make local state variable same name as global state variable
    };

    //ensure you add this component as listener to global state
    componentDidMount(){
        addGlobalStateListener("authUser",this);
    }
    //ensure you remove the listener when unmounted
    componentWillUnmount(){
        removeGlobalStateListener("authUser",this);
    }

    //this is how you update state, as simple as setState
    updateStateEveryWhere(){
        setGlobalState({authUser:{name:'Andreas'}});
    }


}


by Andreas Borg
hello@elevated.to
*/

global.__globalState = {};

const GS = global.__globalState;


const checkInit = (name)=>{
    if(!GS[name]){
        GS[name] = {};
        GS[name].subscribers = [];
        GS[name].value = null;
    }
}

const asGlobalState = (name, initVal)=>{
    checkInit(name);
    if(!GS[name].value){
        GS[name].value = initVal;
    }
    return GS[name].value;
}

const addGlobalStateListener = (name,subscriber) =>{
    checkInit(name);
    GS[name].subscribers.push(subscriber);

}

const removeGlobalStateListener = (name,subscriber) =>{
    checkInit(name);
    for(let i in GS[name].subscribers){
        if(GS[name].subscribers[i] === subscriber){
            GS[name].subscribers.splice(i,1);
        }
    }
}

const setGlobalState = (state) =>{
    for(let name in state){
        let value = state[name];

        checkInit(name);
        GS[name].value = value;

        for(let listener of GS[name].subscribers){
            try{
                let s = listener.state;
                s[name] = value;
                listener.setState(s);
            }
            catch(e){
                console.log("setGlobalState error: " +e.message);
            }
        }
    }
}

const getGlobalState = (name) =>{
    checkInit(name);
    return GS[name].value;
}

const globalToLocalState = (value,name)=>{
    let s = this.state;
    s[name] = value;
    this.setState({s});
}

export {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener,getGlobalState};