var _ = require("underscore");

// The js engine resolves a "require" in the following sequence:
// 1. Core module
// 2. File or folder (will search for ./underscore.js or ./underscore/index.js)
// 3. node_modules folder

var result = _.contains([1, 2, 3], 2);
console.log(result);
