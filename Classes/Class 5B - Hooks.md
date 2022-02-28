## Class 5B - Hooks
Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks area closely connected to functional components, and you recognize them becuase they all start with the prefix `use`, as in `useState`, `useRef` or `useEffect`.

* Whilst Facebook is moving towards favoring hooks, they assure us that there are no plans to remove classes from React.

* Crucially, Hooks work side-by-side with existing code so you can adopt them gradually.

So far we have been lookign at `class components`, so this example should make sense to you.

```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

You see the familiar constuctor, and the render method. The same simple counter can be written as a `functional component` like this:


```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

As you can see methods aren't encapsulated inside a class, and the whole function is simply expected to return the JSX instead of rendering it inside a render function.

### Hooks
>What is a Hook? A Hook is a special function that lets you “hook into” React features.   

When would I use a Hook? If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. 

#### useState
>What does calling useState do? It declares a “state variable”. Our variable is called count but we could call it anything else, like banana. This is a way to “preserve” some values between the function calls — useState is a new way to use the exact same capabilities that this.state provides in a class. Normally, variables “disappear” when the function exits but state variables are preserved by React.


The only argument to the useState() Hook is the initial state. Unlike with classes, the state doesn’t have to be an object. 

It returns a pair of values: the current state and a function that updates it. This is why we write const [count, setCount] = useState().

This JavaScript syntax is called [array destructuring](https://www.freecodecamp.org/news/array-destructuring-in-es6-30e398f21d10/). 


#### useEffect
Because functional components don't have `componentDidMount` or `componentDidUpdate`, how are you supposed to call an init function? The Hooks approach is `useEffect`	 as such method calls are called `side effects` (for some reason).

The `useEffect` hook is simply a function that expects a function as argument, which in it's turn will be called when the component first loads or mounts.

In our example from first class we loaded 10 words from a remote data source. The place to call the function that loads the data now would be inside the useEffect.

```   
const loadRemoteData = async()=>{
    console.log("loadRemoteData");
     const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=10"
      );

      // the ten words loaded from the API
      const words = await response.json();
      console.log(words);
  }

  useEffect(()=>{
   loadRemoteData()
  });   

```
 
What happens if you run this code? The data loads on first run, but it also loads EVERY TIME YOU CLICK THE BUTTON! The first big gotcha with useEffect is this, it is *called every time the component is rendered!* 


>If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run. This isn’t handled as a special case — it follows directly from how the dependencies array always works.

We would need to update our call like this.


```   
  useEffect(()=>{
   loadRemoteData()
  },[]);   

```
 
More specifically, if you want to run useEffect only when some variable has changed value, you need to return that name of the value from the useEffect function. This function would only be called when `count` was updated.


```
useEffect(()=>{
console.log("useEffect");
},[count]);
```

Also, instead of unsubscribing to listeners in the `componentWillUnmount` method, you specify what should happen during clean-up by returning a function eg.

```   
useEffect(() => {
// ...
	ChatAPI.subscribeToFriendStatus(props.friend.id, 	handleStatusChange);
	return () => {
	ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
};
});
```

Does that make sense? ;-) Facebook thinks that it is easier to understand than classes.

From [React docs](https://reactjs.org/docs/hooks-intro.html)

>In addition to making code reuse and code organization more difficult, we’ve found that classes can be a large barrier to learning React. You have to understand how this works in JavaScript, which is very different from how it works in most languages



#### useRef
So variables in functional components only live for the duration of a render call. If that seems counter-intuitive to you, you are not alone. What if you want persistence across different render calls, but don't want to use state (since it invokes a re-render on every update)? This is a fairly common scenario when you are working with a big complex component where you don't want to invoke the constructor every time something is re-rendered. Or, if you are working with processes on separate threads, like sound, machine learning analysis or opengl 3D geometry, where you don't want to recreate the object unnecessarily. This is where you can use `useRef`. It is an object that stays alive between renders, by keeping a pointer to it. Here is an example using [audio](https://snack.expo.dev/@borgus/hooks-useref).

```
const player = useRef();
const { sound } = await Audio.Sound.createAsync(
       require('./assets/8d82b5_Angry_Birds_Bird_Flying_Sound_Effect.mp3'),{},onPlaybackStatusUpdate
    );
    
//set the pointer by setting the current value
player.current = sound;
```

On the next render, it won't be recreated.

Note though: *A ref changing value doesn’t trigger a re-render!*



#### Todays tasks


Study the [Hooks documentation](https://reactjs.org/docs/hooks-effect.html).   
Check out my basic [hook example](https://snack.expo.dev/@borgus/hooks-basics).


#### Assignment 5
Pick one of the global state management frameworks I outlined last week - [globalState](https://github.com/borg/Mobile-Application-Development/blob/master/Classes/Class%205%20-%20Global%20State.md), [Context](https://reactjs.org/docs/context.html), [Hookstate](https://hookstate.js.org/docs/global-state), [EasyPeasy](https://easy-peasy.vercel.app/docs/tutorials/quick-start.html) or [Redux](Redux) - and convert your todo app to an app that    
1. maintains a global todo state, accessible from any part of the app   
2. stores the state in a persistent storage (either Async or remotely), so it's remains on app/browser reload.

I would consider redux the hardest route, so that would give you extra points. If you choose `redux` you can dig into a video tutorial like [this](https://www.youtube.com/watch?v=poQXNp9ItL4).

