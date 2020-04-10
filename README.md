#README

```
myevents-webapp-express
```

Example of a web API app server that can run on a computer to allow monitoring and control from a web client.
App uses Node & Express that provide a RESTful API responding to an ajax request, and returns a JSON object which can be directly referenced in the client.

events-api.js is a node.js application. its an http server which serves html and js files, and also responds to API requests

to start, download the source files into a new directory on the RPi, and run node from command line with the myapi.js file as argument
```js
    > node events-api.js
```
this starts the http server on localthost using port 3000

When a user now browses to http://[your local IP Address]:3000, the index.html will be loaded ad displayed (served by event-api.js) 
index.html loads the myclient.js file which contains the JSON query logic.
