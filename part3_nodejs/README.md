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

## 2. Prepare for Node Packge Manager and the remaining content:

### Package.json

In Mosh's videos, he's using an earlier version of npm, to make it easier, I fixed my npm version to be the same as his

```bash
sudo npm i -npm@5.5.1

# Toby: on m1, you may meet an issue where the node version is not compatible with this npm version,
# to solve in rosetta terminal:
arch -arm64 brew install nvm
nvm install 8.9.1
nvm use 8.9.1
```

And in this chapter, we will do our work in the `npm-demo` folder

```bash
mkdir npm-demo
cd npm-demo

# first we need to create this package.json file:
npm init

# or easier
npm init --yes
```

Whenver we work with node, we will need this `package.json` file

### Installing a node package

```bash
npm i underscore
```

### Package dependencies and Source control

In real world application, the node_module folder can be very huge.

To solve that, we usually ignore it in source control.

And node can reinstall these dependencies simply by looking at the package.json.

Thus, whenever we need, we can go to the folder, and then run `npm i` to get all these things in the node_module.

### Semantic Versioning

For a package, we may see: `"mongoose" : "^4.13.6"`

These digit means: major.minor.patch

patch = bug fix

minor = new features

major = big change

and the `^` sign means that we are ok with any latest version as far as the `major == 4`. (aka `4.x`)

Another commonly seen versioning symbol is: `"underscore" : "~1.8.3"`, this means `1.8.x`.

### Listing the installed packages

```bash
npm list # this will show you all the details, to see less

npm list --depth=0 # only show the package you installs directly
```

### Installing a specific version of a package

```bash
# first you can all the exisiting versions via
npm view mongoose versions

npm i mongoose@2.4.2
```

### Environment Variables (nice)

```js
// PORT
// if we set the mac port environment via export PORT=5000
const port = process.env.PORT || 3000; // this line will make const port = 5000!
// otherwise, if we didn't specified port in our terminal, 3000 will be returned as result of false || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
```
