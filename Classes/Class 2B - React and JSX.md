## Class 2B - Deeper dive into components, state, props and JSX

Today will take a deeper look at React components to fully understand how components work and communicate.


#### Class components
Class components are the components we've been using so far in class, we define them
by extending the `React.Components` with our own class name, overwriting (at least) 
the render method to return JSX and setting up our component with lifecycle methods (such as `componentDidMount()`).

``` jsx
class MyComponent extends React.Component {
  render() {
    return (<h1>Hello World! I'm {this.props.name}!</h1>)
  }
}

<MyComponent name="Joe" />
```

These components provide us with the ability to set local `state`, update and re-render our component
when the state changes, assign class-bound handlers and, as mentioned, take advantage of lifecycle methods.

This is a great option for "smart" components that have to manage a lot of data and interaction.

You can review the common lifecycle methods in a diagram [here](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).
For a complete list of lifecycle methods, [visit the documentation](https://reactjs.org/docs/react-component.html#componentdidupdate).

[Here is an annotated example of a class component on glitch.com](https://glitch.com/edit/undefined?path=app/components/ComponentWithState.jsx:4:19)


#### Functional components
Sometimes we just want to render a small piece of dynamic content with JSX, like a simple list item.
Or maybe we need to render the same thing hundreds of times on the page and don't want to have a class
initialized with state and event handlers for every single one.

It can be convenient to use functional components, single function components that receive `props` as an argument and output `JSX`.
It's as simple as calling a function.

``` jsx
const MyComponent = (props) => (
  <h1>Hello world! I'm {props.name}!</h1>
)

<MyComponent name="Joe" />
```

In fact, the output of the `render()` method on a class component or the `return` statement of a functional component are the same!
We use both in exactly the same way so we don't care which is which when we compose them in parent components.

[Here is an annotated example of a stateless functional component](https://glitch.com/edit/#!/react-basic?path=app/components/ComponentWithoutState.jsx
)

#### The magic of setState   
The reason to use `setState` instead of over-writing the state property itself is that calling the setState function re-renders the component. Properties can be updated at any time, but if you want the graphics to reflect the changes you need the component to be re-rendered. 

Check out [this](https://codesandbox.io/s/timer-m31y8) example of a simple timer, which mixes stateful components, fixed components and nested props to understand more about re-rendering.


#### Hooks give functional extra power
Hooks is a fairly new addition to React, and they super charge functional components with features such as useState, useEffect, useRef etc which previously were only available in class components. For now, the class will not spend much time on hooks as I find class components easier to understand, but if you want to learn about hooks check out [this reference](https://reactjs.org/docs/hooks-intro.html).


#### JSX

JSX is an odd hybrid of JavaScript and HTML.  

JSX can:   
* be declared as a single element   
* be an array of elements   
 

```
render() {
    const el = <h1>Single element</h1>;
    const listItem = <p>List item</p>;
    const list = [];
    list.push(listItem);
    list.push(listItem);
    list.push(listItem);
    list.push(listItem);

    return (
      <div>
        {el}
        {list}
      </div>
    );
  }
   
```
  
* be used to set dynamic properties   

```
<MyNameTag name={myFirstName + "" + myLastName} />
```   


Each element can only contain one container tag. It's ok to use fragment <> to achieve that.

```
<>
<Item />
<Item />
<Item />
<Item />
</>

```

#### JSX conditional rendering

```
{condition && <Tag/>}
```

```
{isA?(
<A/>
):(
<B/>
)}
```


#### Resources
[JSX in depth](https://reactjs.org/docs/jsx-in-depth.html)


### Assignment 2
**Part one**

Make a minimal to-do  list

1. Use codesandbox.io to make an App component
2. Add a form text input field
3. Add  a button
4. Add anything entered into text field to the to-do list

It should end up something like this

![todo](https://user-images.githubusercontent.com/203895/152247195-bf3a1e5e-210a-4cff-a539-92b940431660.jpg)

Share a link to your repo  below

**Part two**   
Select your favorite mobile app and be prepared to show it  to class and explain what's so great about it.

