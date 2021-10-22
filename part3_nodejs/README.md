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

## 3.Advanced Express

See in `express-demo` folder.

```js
const port = process.env.PORT || 3000; // this line will make const port = 5000!
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

And then, we have `get`, `post`, `put`, and `delete` from `express()` to perform basic CRUD functionalities.

### 1). Middleware function:

**A middleware function** = a function that takes a `request` object, and either returns a response to the client, or passes control to another middleware function.

For example, the route handler function we saw previous is one middleware function:

```js
app.get("/", (req, res) => {
  res.send("Hi mom");
});
```

Where the `(req, res) => ...` is the route handler function.

### 2). creating custom middleware

Notice that our middleware function is called in sequence.

## 4. Asynchronous Javascript

See in the `async-demo` folder.

> Notice that asynchronous != multi-thread

When dealing with aysnc functions, there is a very practical challenge: we may not know what the return will be by the time we want to display them, for example:

```js
console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading db...");
    return { id: id, github: "toby" };
  }, 2000);
}
```

In this example, we will get:

```
Before
After
undefined
```

because the function `getUser` won't be able to access the `return {id: id, ...}`

And there are three common solutions:

### 1. Callbacks

```js
// When dealing with aysnc functions, there is a very practical challenge.

console.log("Before");
getUser(1, function (user) {
  console.log("User", user);
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database... ");
    callback({ id: id, githubUsername: "Toby" });
  }, 2000); // this setTimeout is aync!
}
```

Extending from the previous example to make is slightly more compelx:

```js
console.log("Before");
getUser(1, function (user) {
  console.log("User", user);

  getRepo(user, function (repo) {
    console.log(repo);
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout((id) => {
    console.log("Reading a user from a database... ");
    callback({ id: id, githubUsername: "Toby" });
  }, 2000); // this setTimeout is aync!
}

function getRepo(user, callback) {
  setTimeout((user) => {
    console.log("calling github api...");
    callback(["repo1", "repo2", "repo3"]);
  });
}
```

ISSUE:
As the async content we require grows (for example user -> repo -> commits...), this async callback can grow into a huge nested loop (`CALLBACK HELL` or `CHRISTMAS TREE PROBLEM`.)

POTENTIAL SOLUTION:
We can flat these nests out by changing annoymoust functions into named functions (nested -> linked list).

```js
console.log("Before");
getUser(1, getRepositories);
console.log("After");

function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  getCommits(repo, displayCommit);
}

function displayCommit(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout((id) => {
    console.log("Reading a user from a database... ");
    callback({ id: id, githubUsername: "Toby" });
  }, 2000); // this setTimeout is aync!
}

function getRepo(user, callback) {
  setTimeout((user) => {
    console.log("calling github api...");
    callback(["repo1", "repo2", "repo3"]);
  });
}
```

### 2. Promises

BETTER, we can use promises to solve the issues above (Callback hell.)

> PROMISE = holds the eventual result of an asynchronous operation.

sequential promises:

```js
const user = getUser(2);
user
  .then((user) => getRepositories(user.githubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("Commits:", commits))
  .catch((err) => console.log("Error:", err.message));
```

it is executed one by one

parallele promises:

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 2");
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2]).then((result) => console.log(result));
// notice the result here will be an array[resolve1, resolve2]
```

### 3. Aync/await

```js
async function displayCommits() {
  try {
    const user2 = await getUser(1);
    const repos = await getRepositories(user2.githubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (error) {
    console.log("error:", error.message);
  }
}
```
