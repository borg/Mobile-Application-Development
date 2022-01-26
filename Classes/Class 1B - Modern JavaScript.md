## Class 1B - Digging deeper into Modern JS

### MODERN JAVASCRIPT
Because JS is an old language, there is a lot of legacy syntax around, and it's helpful to know what's supported on the target platform.

### These Modern JavaScript (ES6-ES9) features are essential to understand to code React (Native)

```  
* let / const
* for ... in / for ... of
* class / extends 
* arrow functions
* async/await promises  
* destructuring objects {prop1,prop2}
* ...obj spread
* import vs require
```


#### JavaScript Classes and Object-oriented programming

- [Classes and class extensions example](https://github.com/borg/Mobile-Application-Development/tree/master/Classes/examples/classes-and-extensions.js) 
- [JavaScript Classes on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Class extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)


#### Arrow functions vs bind in React event listener   

- [Minimal React button example](https://codesandbox.io/s/black-forest-k4phg?file=/src/App.js)   
- [Context, binding and arrow functions explained](https://www.codementor.io/dariogarciamoya/understanding-this-in-javascript-with-arrow-functions-gcpjwfyuc)
- [Event propagation (bubbling) explained](https://www.youtube.com/watch?v=UWCvbwo9IRk&ab_channel=dcode)

#### async/await
- [Loading data from API with async method](https://codesandbox.io/s/nostalgic-goodall-iyqut?file=/src/App.js)
- [async/await overview](https://dmitripavlutin.com/javascript-fetch-async-await/)

#### destructuring and spreading (...obj)
- [example of destructuring and spreading](https://codesandbox.io/s/distracted-thunder-9z9xi?file=/src/App.js)

#### Sharing code between files - require (CommonJS) vs import (ES6)?
NodeJS (<v13) uses CommonJS, ie. 

- [require & import example](https://codesandbox.io/s/quizzical-currying-bonxi?file=/src/App.js)


```require
File1.js
module.exports = {dada:'dada'};

File2.js
const doda = require('./File1');
console.log(doda.dada);
```

React is using mainly ES6 `import` syntax

```
File3.js
export default {dada:'dada'};

File4.js
import doda from './File3';
console.log(doda.dada);
```
but `require` is still used in RN, expecially when including files and images. Also, if you need to share components with a NodeJS backend that doesn't support ES6 imports, you may need to rewrite them as CommonJS.

### Assignment
1. `fork` a version of [this](https://codesandbox.io/s/angry-lake-bud0c?file=/src/App.js) sandbox
2. Load 10 random words from `"https://random-word-api.herokuapp.com/word?number=10"` using `async fetch` call
3. Find the longest word
4. Reverse the order of the letters in the longest word and output the result, eg. if the longest word is `complexity` the correct result should be `ytixelpmoc`
5. Use at least 3 features of ES6 we have covered today
6. Post your solutions as a github issue on [this thread](https://github.com/borg/Mobile-Application-Development/issues/1)








