## Class 5A - Global State & Local Storage

So far we've learned how data, and state, are created, manipulated and passed through different components in our application:
- Data is stored on components using `state`, and updated with `setState`.
- Application state is propagated with props down the component tree with `props`.
- Actions are passed with `props` as well, and can modify data up the tree.
- React re-renders components in response to state changes, and subsequent propagation of `prop` changes.

This is an important mechanism to understand as it makes it possible for us to:   
* Build dynamic interfaces that change in response to data updates.   
* Begin separating small reusable components and larger components that hold data.   
* Manage data flow throughout our application (in cases such as interaction and navigation).


However, the top down model of data flow has it's drawbacks, which become evident when your apps grow in complexity. Passing state down to child components with a callback up to the parent when the child changes the state is manageable as long as no other part of your app also needs to know that the state has changed, but what about other sibling components, or a screen in a totally different part of the navigation not even currently loaded? 

For example, a common use case is handling an authenticated user, and any changes to that user. For instance, a social media app may want to show the follow count of the authenticated user in many parts of the app. Following the top-down pattern we would need to store the user at the app level, and pass it down to all children as a prop. It quickly get tedious. How about storing the `user` as a `global variable`? 

```
global.globalUser = {name:"Bob",followers:123}
```

That makes perfect sense, since each part of your app can read that and display it regardless of where it happens to live. Imagine a child component with props passed down from the parent, that also maintains it's internal state (eg. a checkbox) and reading some global variable. It would look something like this:

```
render(){
	const {localVariable} = this.state;
	const {parentVariable} = this.props;
	const {globalUser} = global;
}
```

#### The Simplest Global State implementation around

Since this React is normal JavaScript this works just fine for constants, but if you update the follow count on the `globalUser` your components won't update automatically to show the difference. As you have learnt, to update the visual you must call `setState`. So, the next time you happen to call `setState` on your component, the new value will show. This is not a very elegant pattern. How can we make it better? What if we can tell all components who are interested that the value has changed? What if there was a `central dispatcher`? (That is what Facebook's [flux pattern](https://facebook.github.io/flux/docs/in-depth-overview) kinda did.) Events and event dispatcher are a core part of most software stacks, [including the web](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events), for a reason - they work and make sense. You can make your own global event dispatcher and make each component listen to state changes and rerender accordingly. Alternatively, you can delegate the rerender to the global dispatcher, and let it call the rerender for you. That's what my simple `globalState` implementation does.

```
//create a unique namespace to prevent collissions
global.__globalState = {};

//abbreviation
const GS = global.__globalState;

//make it possible to provide default value
const checkInit = (name)=>{
    if(!GS[name]){
        GS[name] = {};
        GS[name].subscribers = [];
        GS[name].value = null;
    }
}

//this is what you use to turn local state into glob al
const asGlobalState = (name, initVal)=>{
    checkInit(name);
    if(!GS[name].value){
        GS[name].value = initVal;
    }
    return GS[name].value;
}

//always add your component as a listener in componentDidMount
const addGlobalStateListener = (name,subscriber) =>{
    checkInit(name);
    GS[name].subscribers.push(subscriber);

}

//ensure you remove the listener when unmounted
const removeGlobalStateListener = (name,subscriber) =>{
    checkInit(name);
    for(let i in GS[name].subscribers){
        if(GS[name].subscribers[i] === subscriber){
            GS[name].subscribers.splice(i,1);
        }
    }
}

//whenever you want to update global state use this
//all your components will automagically be updated
//this is the non-reacty approach that saves you
//writing A LOT of reducer code
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
```

An example for our `globalUser` could be   

```
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from 'common/globalState';

class Profile extends Component {
    state = {
        globalUser: asGlobalState('globalUser',null) //make local state variable same name as global state variable
    };

    //ensure you add this component as listener to global state
    componentDidMount(){
        addGlobalStateListener("globalUser",this);
    }
    //ensure you remove the listener when unmounted
    componentWillUnmount(){
        removeGlobalStateListener("globalUser",this);
    }

    //this is how you update state, as simple as setState
    updateStateEveryWhere(){
        setGlobalState({globalUser:{name:'Andreas',followers:124}});
    }


	//and the updated render function can now read 
	//globalUser from local state
	render(){
		const {localVariable, globalUser} = this.state;
		const {parentVariable} = this.props;

	}
}   
```

I think this is the simplest and shortest global state manager around, and I have used it in both React and React Native implementations without problem. But, calling `setState` fromt he outside is not particularly kocher. We will look at the official approaches next.

There is a lot of fashion in programming, and different state managers have come and gone. The original Facebook `Flux` approach is now deprecated, and `Redux-Saga` is growing old. This is a list of [fashionable options in 2022](https://blog.openreplay.com/top-6-react-state-management-libraries-for-2022). How to choose? Try different approaches and whichever makes sense to you and does what you need it to do is good. As you explore different options you will find that the [hooks paradigm](https://reactjs.org/docs/hooks-state.html) is coming more and more into focus. 

#### React Context
The first option is part of the react core. Instead of creating a global variable, it is creating a `global context` which wraps around all components, making the global state available everywhere. It's pretty neat, but using it with class components may be challenging.

Study this example to see how you could rewrite your todo app using context.

[useContext todo example](https://codesandbox.io/s/react-usecontext-todo-app-forked-8gl8pk)

#### Hookstate
[This library](https://hookstate.js.org/docs/global-state) is fairly new, and seems quite lightweight and easy to use. In spite what the name suggests it seems possible to use with both class and functional components.

I have rewritten the globalState example above showing how you could use Hookstate instead.


[useHookState todo example](https://snack.expo.dev/@borgus/hookstate-async-storage-tasks)

I looked at the official [hookstate demo](https://github.com/avkonst/hookstate/tree/master/docs/demos/todolist) for inspiration.

(In addition, I'm also implementing AsyncStorage see below)


#### Redux
The most widely used global state manager today is probably [Redux](https://www.digitalocean.com/community/tutorials/redux-redux-intro). There is a high demand for react redux engineers, and there must be a good reason for its popularity. It takes its name from the concept of `reducers` and `actions`. An `action` is "the [events](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow) that occur in the app based on user input, and trigger updates in the state", but 
what is a `reducer`? From Redux documentation: 

>"A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state: (state, action) => newState. You can think of a reducer as an event listener which handles events based on the received action (event) type."

To see what that means, check out

[redux todo example](https://snack.expo.dev/@borgus/a54394)

```
import { ADD_TODO, DELETE_TODO } from "../actionTypes";

const initialState = {
  todo_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task } = action.payload
      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task }]
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }
    default:
      return state;
  }
}

```

One thing you will notice immediately using redux is that there is A LOT more code to write. If that doesn't disuade you go forth and experiment.

There is an [official tutorial for a todo app here](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers).

Another [redux social media tutorial here](https://www.digitalocean.com/community/tutorials/react-react-native-redux).

#### Easy Peasy
If you want to get into Redux, but would like a gentler onboarding, perhaps check out [easy peasy](https://easy-peasy.vercel.app/docs/tutorials/quick-start.html).

It claims to be a simplified redux implementation. 

Here is an 
[easy peasy todo tutorial](https://betterprogramming.pub/build-a-to-do-app-in-react-with-easy-peasy-and-ant-design-2725dc7d1cf6).


#### Local Storage with AsyncStorage
Finally, managing state in our applications is well and good, but useless if everything resets once we close and reopen our apps. Before we dive into databases, let's learn how to store data locally on the device with `AsyncStorage`.

`AsyncStorage` is a React Native that unifies device storage on iOS and Android. we begin by importing it from `react-native`:   

```
import AsyncStorage from '@react-native-async-storage/async-storage';;
```

To store data, we call `setItem(key, data)`, this will return a Promise that we can use with `async/await` or `.then() / .catch()`:   

```
_storeData = async () => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
};
```

To retrieve an item, we call `getItem(key)`, again receiving a promise:   

```
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
```

Note though that when storing objects or arrays you should `stringify` them first.



```
const loadTodos = async()=>{
  const json = await AsyncStorage.getItem('todos');
  if(json){
    const todos = JSON.parse(json);//remember to parse stringified objects back 
    return todos;
  }else{
    return [];
  }
}

const saveTodos = async (todos)=>{
    try {
      //remember to stringify object!!!!
      const jsonString = JSON.stringify(todos);
      await AsyncStorage.setItem('todos',jsonString);
    } catch (e) {
      // saving error
      console.log(e.message);
    }
 }
```



[globalState with async example](https://snack.expo.dev/@borgus/globalstate-async-example)


Check out how I combined   
[Hookstate with AsyncStorage example](https://snack.expo.dev/@borgus/hookstate-async-storage-tasks) 










