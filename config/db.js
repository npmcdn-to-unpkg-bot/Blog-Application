/**
 * Created by Raphson on 2/21/16.
 */
var secerts = require('./secrets.js');
var mongoose = require('mongoose');

mongoose.connect(secerts.dburl);
var db = mongoose.connection;

module.exports = {
    dbconnect: function(){
        db.on('error', console.error.bind(console, 'MongoDB connection Error.'));
        db.once('open', function callback(){
            console.log('connection was successful');
        });
    }
}