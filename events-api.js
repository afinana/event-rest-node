/**
 * myapi.js
 * 
 * @version 1.0 - updated for Express 4.x : April 2020
 *
 * 
 * DESCRIPTION:
 * a  server-side application to demonstrate running a node 
 * API Appserver on a host to access a local database
 * Uses the Express node packages. 
 * 
 * 
 * @throws none
 * @see nodejs.org
 * @see express.org
 * 
 * @author Antonio Fiñana
 * (C) 2013 Middleladn
 */

var http      = require('http');
var express   = require('express');

var app       = express();

// dummy input port values for our example
var events = [    { id: '1', name: 'My Event 1', description: 'description of event 01' },
                  { id: '2', name: 'My Event 2', description: 'description of event 02'}
                ];

// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/events/:id', function (req, res) {
  // send an object as a JSON string
  console.log('id = ' + req.params.id);
  res.send(events[req.params.id]);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/events', function (req, res) {
  // send an object as a JSON string
  console.log('all city events');
  res.status(200).send(events);
}); // apt.get()

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');