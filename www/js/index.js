// Use a Node.js core library
var url = require('../../node_modules/irc');

// Parse the URL of the current location
var parts = url.parse(window.location);

// Log the parts object to our browser's console
console.log(parts);
