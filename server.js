/**
 * Created by Raphson on 2/18/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var port = process.env.port || 2000;
var app = express();

var db = require("./config/db");
var routes = require('./server/routes');

db.dbconnect();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


routes(app);

console.log(port);
app.listen(port, function(){
    console.log('Magic Happens on port ' + port);
});