Frank Hrach
TeleIRC application

I attempted as hard as I possibly could to get this working with an actual
TeleIRC server, however, there was no way I could get this to work using
Ionic2 with a current browser.

The issue is that to get proper network or socket support I would need to use
an npm module. The old way of loading these using require('module') is both
depricated, and, does not work even when manually added with requirejs becuase
the module is not served through the ionic or cordova webserver without some
crazy modificaitons using browserify, possibly.

The new method to import npm modules is with the new javascript
import name from module syntax, which, no browser currently supports
    https://caniuse.com/#feat=es6-module
As such, I was unable to get the network functionality working in a browser,
and, all attempts to debug using my phone also failed due to detailes of my
development envionment.

However, the core functionality of the application is intact because it is
designed to use a SqLite database to store chats, and, the IRC connection would
simply update that database. The application has no problems reading and writing
to that database currently.
