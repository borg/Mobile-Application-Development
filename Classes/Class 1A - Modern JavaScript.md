## Class 1A - Why you are so very lucky

### History of JavaScript

JavaScript is an [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript), also called ES, which is a standard. There used to be other scripts, such as ActionScript, but now it really only applies to JavaScript. Each generation of ES standards have included new features, and whilst the latest edition is 12, we're only going to study features introduced up until edition 9 (ES9, from 2018).


### Why you are so very lucky!
In the era of Web1.0, websites and CMSs with a lot of JS used to be considered monsters. They were often large and sluggish, and the idea of coding whole servers and apps in JS alone was largely unthinkable until NodeJS came around in 2009.

If you wanted to build something for a physical installations, such as an event space or museum, or distribute software offline, your options were still limited to [ex-Macromedia](https://en.wikipedia.org/wiki/Macromedia) products like [Flash](https://en.wikipedia.org/wiki/Adobe_Flash) and [Director](https://en.wikipedia.org/wiki/Adobe_Director) (Lingo). None of those were powerful enough to drive large videos. 

When the iPad was released in 2010 you had to learn Objective C to build anything, and for most people not used to the syntax it felt very counter-intuitive.

To be a creative technologist, and make cool s**t you needed more *power*. To get more power you had to go native.

> To get more power you had to go native.
  
Here is a brief list of programming languages and frameworks you would need to learn to be a professional creative technologist.  

* ActionScript  
* Lingo  
* PHP  
* Processing  
* JAVA  
* openFrameworks  
* C   
* C++  
* ObjC  
* Swift  

Today, you can accomplish more than was imaginable 10 years ago, using only JavaScript, and not even knowing any of the other languages. In many ways, all of these languages can be replaced with Modern JavaScript.

> All these languages can be replaced with Modern JavaScript.

There is a whole ecology of frameworks and packages that are largely compatible, available for free and require you to mainly know just one programming language. And that is why you are so very lucky.


The list of great frameworks is endless - React, ReactNative, threeJS, p5JS, paperJS, toneJS, NodeJS, KeystoneJS, NextJS, VueJS...


### Why I love JavaScript   
-no compilation time   
-your app doesn't (necessarily) crash and burn on every tiny error   
-functions can be string variable names  
-incredible frameworks for free  

### Why I love React  
-object oriented, class based JS (best of both worlds)  
-tidy components, clear structures

### Why I love ReactNative 
-you get the power of native, without (a lot of) the hassle of debugging native code  
-can reuse code between projects, frontend & backend, web and native  
-as long as you stay inside the walled garden you can spend most of you time being productive/creative, instead of pulling your hair out reading stack traces of obscure pointer allocations


### MODERN JAVASCRIPT
Because JS is an old language, there is a lot of legacy syntax around, and it's helpful to know what's supported on the target platform.

### Some Modern JavaScript (ES6-ES9) features to know

```  
* class extends 
* for ... in / for ... of  
* arrow functions
* let (local declaration)  
* async/await promises  
* ...obj spread
```

#### JavaScript Classes and Object-oriented programming

[Classes and class extensions example from class](https://github.com/BarakChamo/Mobile-Application-Development/blob/master/Classes/examples/classes-and-extensions.js) 

- [JavaScript Classes on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Class extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
- [Context, binding and arrow functions explained](https://www.codementor.io/dariogarciamoya/understanding-this-in-javascript-with-arrow-functions-gcpjwfyuc)


### Sharing code between files - require (CommonJS) vs import (ES6)?
NodeJS (<v13) uses CommonJS, ie. 

[require & import example](https://codesandbox.io/s/quizzical-currying-bonxi?file=/src/App.js)


```require
File1.js
module.exports = {dada:'dada'};

File2.js
const doda = require('./File1');
console.log(doda.dada);
```

React is using mainly import   

```
File3.js
export default {dada:'dada'};

File4.js
import doda from './File3';
console.log(doda.dada);
```
but require is still used in RN, expecially when including files and images. Also, if you need to share components with a NodeJS backend that doesn't support ES6 imports, you may need to rewrite them as CommonJS.





### Assignment: Setting up your dev environment
For next class, please install all the prerequisite tools and software to be ready to begin mobile application development on your computer and phone.

These tools will facilitate modern, iterative application development on both your computer and your phones and allow you to debug, test and publish you applications easily.

1\. Signup for GitHub

Sign up for a GitHub account [here](https://github.com/join).

2\. Install Git on development computer

Follow the installation process for your OS [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).


3\. Install Visual Studio Code

Download Visual Studio Code [here](https://code.visualstudio.com) and follow the installation.
Install the VS Code React Native Extensions from [here](https://github.com/Microsoft/vscode-react-native).


4\. Install Node.js and the Node Package Manager (`npm`)

Download and install Node.js from [here](https://nodejs.org/en/download/), the installation includes `npm`.

5\. Install yarn as Package Manager by typing into command line

```npm install --global yarn```


6\. Signup for Expo, install Expo and the React-Native Command Line interface

Signup for an Expo account [here](https://expo.io/signup).

Install expo-cli.

```npm install --global expo-cli```

7\. Download [Xcode](https://developer.apple.com/documentation/xcode)

Install Xcode commandline tools   
```xcode-select –install```

