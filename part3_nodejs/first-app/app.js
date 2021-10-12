// // 1. import module from local file
// // better to set require object as const,
// // so can avoid accidental override.
// const log = require("./logger");
// log("message");

// 2. PATH module
const path = require("path");
var pathObj = path.parse(__filename);
console.log(pathObj);

// 3. OS module
const os = require("os");

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log("Total memory:" + totalMemory);
console.log(`Free Memory: ${freeMemory}`);

// 4. FILE SYSTEM Module
const fs = require("fs");

// ps - always use async method!
// const file = fs.readdirSync("./"); // show all files in current path
// console.log(file);
function pwd(path) {
  fs.readdir(path, function (err, files) {
    if (err) console.log("Error", err);
    else console.log("Result", files);
  });
}

pwd("./"); // will show files in current dir

pwd("$"); // will show error

// 5. Events Module
const EventEmitter = require("events");

// register a listern
// const emitter = new EventEmitter();
// emitter.on("messageLogged", function (arg) {
//   console.log("Listener called", arg);
// });

// const log = require("./logger"); // already called above
const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});
logger.log("message");

// pretty powerful idea. extending from the EventEmitter

// 6. HTTP Module
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hi mom!");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log("New connection...");
// });
server.listen(3000);

console.log("Listening on port 3000...");
