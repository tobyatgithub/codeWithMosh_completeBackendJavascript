# Part 3. Node JS

## 1. Node Module System

Each module has a main module, usually it is the `app.js`.

```js
// global objects
console.log("balabal");

setTimeout();
clearTimeout();

setInterval();
clearInterval();

// all these global objects belong to window
// in node, we dont have "window", we have "global" instead.

//in js, var is also global
var message = "hi mom";
//However, it is not global in node, bcz of node's module system
// so that you won't overwrite things between different modules.
// the var is just "global" inside this current module (aka app.js or whatever file it is defined.)
```

Every file in the node is considered a `module`. Everything defined in it is by default "private".
