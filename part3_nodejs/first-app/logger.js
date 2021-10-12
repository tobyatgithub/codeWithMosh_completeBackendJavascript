var url = "http://mylogger.io/log";
const EventEmitter = require("events");

class Logger extends EventEmitter {
  // we dont need function keywords when defining it inside a Class.
  log(message) {
    //send an http request
    console.log(message);

    // rasie an event
    this.emit("messageLogged", { id: 1, url: "https://" });
  }
}

// making this function public by adding this function to
// the module.exports <- anything inside there will be public.
// module.exports.log = log;

// OR we can make it shorter
// module.exports = log;

module.exports = Logger;
