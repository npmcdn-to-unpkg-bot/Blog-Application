/**
 * Created by Raphson on 2/18/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var port = process.env.port || 3000;
var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public/ASM"));


console.log(port);
app.listen(port, function(){
    console.log('Magic Happens on port ' + port);
});