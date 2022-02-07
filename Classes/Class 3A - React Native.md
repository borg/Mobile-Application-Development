## Class 3A - React Native

It's time to leave the browser and get on to our devices.

We are going to take what we have learnt about `react` and apply it to `react-native`.



#### What is React Native?

React Native is React's mobile-native cousin. 

[React Native](https://facebook.github.io/react-native/), is a cross-platform mobile applications framework developed and maintained by Facebook.

Using React Native will let us use JavaScript to build native-quality applications using a language we know, and deploy our apps to both Android and iOS with minimal effort or changes to code.

Think of it this way:
- React is a general JavaScript component-based application development framework.
- React.js is web-based and meant for building browser-based HTML applications.
- React Native still runs on JavaScript, but is used to build native mobile applications.

##### What's the difference?
The difference is that when working in React Native we won't be using `HTML` elements, only `HTML`-like markup.
So instead of `<div>`, `<p>`, and `<span>` we'll write abstract classes such as `<View>` and `<Text>` and these
will render to the coresponding elements for each platform: iOS or Android.

Also, just remember that React-Native doesn't work in a browser, so there's no CSS, we'll be writing styles in code,
more on that later.



To run our code and manage the development environment we'll use [Expo](https://expo.io/), a project built on top of React Native that provides advanced runtime tools and utilities for sharing, testing and publishing code (such as a nifty QR code based mobile testing app and 1-click app publishing).

Let's get started using Expo!

(before we get started though, make sure you have set up your dev environment )


#### 1. Test an example `Expo Snack` on your phone

1. Open `Expo Snack`
In your browser, go to [https://snack.expo.io/](https://snack.expo.io/), you'll see a web-based editor with example React Native code.
2. Press the `Run on device` button at the top right of the screen.
3. In the popup window, choose `QR Code` and scan the QR code in the `Expo` app on your iOS or Android device.

Testing and viewing Expo apps in realtime is as easy as scanning the QR code and viewing the result on your phone.
Try changing the text or messing with the code a little, you'll see the view on your phone change in real time when you hit `Save`.

#### 2. Create a local blank project and test it your phone

1. Follow the instructions in the assignment below to install the `expo-cli` tools in your local machine.
2. Run `expo init {NAME}` in your terminal, replace `{NAME}` with however you'd like to name your project.
3. When propmted, choose an initialization template, `blank` is a good place to start.
4. Fill in the name when prompted and hit `Enter`, the installation should run through a few things before completing.
5. `cd` into your project folder by however you called it. For example, if you ran `expo init example`, navigate to `cd example`.
6. To run the project, run `yarn ios` inside the project folder.
7. Expo will run the server and open a browser window, wait for it load and a QR Code should appear in the bottom right.
8. Make sure your phone is on the same WiFi network as your computer and scan the QR Code.
  - On Android, the Expo app will have a QR Code scanner.
  - On iOS use the camera app, it has a hidden QS scanner.
9. Your app will open on your phone! Just like with snack, if you change code in `App.js` and save, the view on your phone will update.



#### React Native components

The first step in transitioning from React (for web) and React Native is learning to use a new set of components.
If you're used to working with React or `<HTML>`, you'll just find equivalents to do the same job and you'll be on your way.

However, since our React Native code runs natively on a mobile phone, there are some extra hoops to jump through.
You'll notice some components are iOS or Android specific, and you'll have to know which device you're targeting 
in order for your layouts to work correctly, we'll see how to deal with cross-platform apps later in the semester.

First, let's look at some basic components

##### [`<View>`](https://facebook.github.io/react-native/docs/view)
A `View` is a container for content, think of it as a `<div>` in HTML.
`View`s can only contain other components, not arbitrary text or expressions.
in that sense `JSX` for React Native is less flexible than `<html>` in the browser.

##### [`<Text>`](https://facebook.github.io/react-native/docs/text)
A `Text` holds alpha-numeric text and replaces any kind of text element we use on the web like `h1`, `span`, or `p`.
All the styling for different formattings, like body text or headings, comes from the `style` property.

##### [`<Image>`](https://facebook.github.io/react-native/docs/image)
The `Image` component is used to load local and remote images.
One cool feature of React Native is that we can load local images, such as icons and logos
with `require()` from the local project folder rather than a server request.

Refer to the documentation for a complete example on using `Image`s.

##### [`<TextInput>`](https://facebook.github.io/react-native/docs/textinput)
`TextInput` reflaces the similarly named `<input type="text>` and allows us to receive input
text from our component. Since mobile apps have an onboard interactive keyboard, we have more
event options than the regular input in `html`.

`onChangeText` is called ontinuously when the text is changing.
`onSubmitEditing` is called when a user hits the `done` or `next` action key on the mobile soft keyboard.

##### [`StyleSheet`](https://facebook.github.io/react-native/docs/stylesheet)
`StyleSheet`s are not components. Rather, they are an abstraction of a `CSS class` that we can define
once and reuse continuously.

We define a single stylesheet like so:
```javascript
const style = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
});
```

When assigning stylesheets to components, we use the `style={}` property just like with inline styles.
We can provide one or more styles to a components and they override and extend in order:

`<Text style={[styles.brand, styles.heading]}>Hello World!</Text>`

You can think of each stylesheet you create as a CSS class, break each one into small style rulesets
and combine them together.

### Resources

- [Complete list of React Native components](https://facebook.github.io/react-native/docs/components-and-apis)
- [Understanding the flexbox layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [React Native's Flexbox guide](https://facebook.github.io/react-native/docs/flexbox)
- [Running Expo in the browser](https://docs.expo.io/versions/latest/introduction/running-in-the-browser/)
- [Publishing Expo apps](https://docs.expo.io/versions/latest/workflow/publishing/)
- [How React Native works](https://hackernoon.com/understanding-react-native-bridge-concept-e9526066ddb8)

