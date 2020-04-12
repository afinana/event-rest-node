/**
 * events-api.js
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
 * (C) 2020 Middleland
 */

var http      = require('http');
var express   = require('express');
var app = express();
const mongoClient = require('mongodb').MongoClient;
//const url = 'mongodb+srv://mycityevents:albatro1@city-event-cluster-nfe0u.gcp.mongodb.net/test?retryWrites=true&w=majority';
const url = 'mongodb://localhost:27017';

mongoClient.connect(url)
    .then(client => { 
        // ...
        const db = client.db('mycity-events');
        const quotesCollection = db.collection('culturalevents');
        // ------------------------------------------------------------------------
        // configure Express to serve index.html and any other static pages stored 
        // in the home directory
        app.use(express.static(__dirname));

        // Express route for incoming items for a single item
        app.get('/events/:id', function (req, res) {
            // send an object as a JSON string
            console.log('id = ' + req.params.id);
            quotesCollection.findOne(
                { id: req.params.id }
            ).then(result => {
                    res.status(200).send(result);
                  
             }).catch(error => res.status(500).send(error))
        }); 

        // Express route for incoming items for a list of all items
        app.get('/events', function (req, res) {
            // send an object as a JSON string
            console.log('all city events');
            quotesCollection.find({}, { limit: 10, sort: [['_id', -1]] }).toArray().then(events => {
                    console.log(events);
                    res.status(200).send(events);
                  
                })
                .catch(error => res.status(500).send(error))
           
        }); 

        

        // Express route for any other unrecognised incoming items
        app.get('*', function (req, res) {
            res.status(404).send('Unrecognised API call');
        });

        // Express route for incoming items for store a single item
        app.post('/events', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                }).catch(error => console.error(error))
        })

        // Express route for delete a single item
        app.delete('/events/:id', function (req, res) {
            // send an object as a JSON string
            console.log('event = ' + req.params.id);
            quotesCollection.deleteOne(
                { id: req.params.id }
            ).then(result => {
                res.status(200).send(result);

            }).catch(error => res.status(500).send(error))
        }); 
        // Express route for update a single item
        app.put('/events/:id', auth, function (req, res, next) {
            req.collection.update({
                _id: id(req.params.id)
            }, { $set: req.body }, { safe: true, multi: false }).then(result => {
                res.send((result === 1) ? { msg: 'success' } : { msg: 'error' });
            }).catch(error => res.status(500).send(error))
        });

        // Express route to handle errors
        app.use(function (err, req, res, next) {
            if (req.xhr) {
                res.status(500).send('Oops, Something went wrong!');
            } else {
                next(err);
            }
        }); // apt.use()

    }).catch(console.error);

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');