## Class 3 - Deeper dive into components, and leaving the browser

Today will take a deeper look at React components to fully understand how components work and communicate.
Then, we'll move back to React Native and leave to browser, moving to native apps where we'll spend the rest of the semester.


#### Stateful components (class components)
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


#### Stateless components
Sometimes we just want to render a small piece of dynamic content with JSX, like a simple list item.
Or maybe we need to render the same thing hunders of times on the page and don't want to have a class
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

With functional components hooks were introduced,to enable things like state, and componentDidMount. To learn about hooks check out [this reference](https://reactjs.org/docs/hooks-intro.html).

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
