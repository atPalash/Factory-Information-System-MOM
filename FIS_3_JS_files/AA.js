var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var mimeMessageMaker = require('./mimeMessageMaker');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var hostname = 'localhost';
var port = 5555;

//setting connection to mysql database
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306, //Port number to connect to for the DB.
    user     : 'root', //!!! NB !!! The user name you have assigned to work with the database.
    password : 'mm123456', //!!! NB !!! The password you have assigned
    database : 'camx' //!!! NB !!! The database you would like to connect.
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.text({type: 'text/plain'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//check running status of the equipment
var equipmentStatus = false;
function resetStatus() {
    equipmentStatus = true;
}
function getStatus() {
    setInterval(function () {
        if(equipmentStatus){
            console.log("Equipment Running");
            equipmentStatus =false;
        }else {
            console.log("Equipment Stopped");
        }
    },25000);
}

getStatus();

app.get('/', function (req, res) {
    res.end('hi');
});

//repeated polling of MSB by AA to search for state change events
setInterval(function () {
    request({
            url: 'http://localhost:5000/changeState',
            method: "GET"
        },function (err, res, body) {
            if(err){
                console.log(err.code +" "+ err.address +"/"+ err.port);
            }else{
                console.log(body);}
        }
    );
},5000);

//repeated polling of MSB by AA to receive heartbeat at AA
setInterval(function(){
    request({
            url: 'http://localhost:5000/heartbeat',
            method: "GET"
        },function (err, res, body) {
            if(err){
                console.log(err.code +" "+ err.address +"/"+ err.port);
            }else{
                console.log(body);
            }
        }
    );
},10000);

//event defined by the post body from MSB are received and stored into database
app.post('/notifs', function (req, res){
    var data = req.body;
    var sender = data.substring(data.search('sender')+8,data.search('destination')-2);
    var date = new Date().toISOString();
    var XMLIPC2501 = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<soap-env:Header><IPC2501MsgInfo:MessageInfo xmlns:IPC2501MsgInfo="http://webstds.ipc.org/2501/MessageInfo.xsd" sender="AA-localhost/5000"' +
        ' destination="MSB-localhost/5000" dateTime="'+date+'" messageSchema="http://webstds.ipc.org/2541/Acknowledgement.xsd" messageId="MSB-localhost/5000|'+date+'"/>';
    var XMLIPC2501Ack = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<IPC2501Ack:Acknowledge xmlns:IPC2501Ack="http://wbstds.ipc.org/2541/Acknowledge.xsd" dateTime="'+date+'" MessageId="MSB-localhost/5000|'+date+'|0001">';
    var mime = mimeMessageMaker.mimeMessageMaker(XMLIPC2501,XMLIPC2501Ack);
    res.end(mime);

    var sender = data.substring(data.search('sender')+8,data.search('destination')-2);
    var destination  = data.substring(data.search('destination')+13, data.search('dateTime')-2);
    var dateTime  = data.substring(data.search('dateTime')+10, data.search('messageSchema')-2);
    var messageSchema  = data.substring(data.search('messageSchema')+15, data.search('messageId')-2);
    var messageId  = data.substring(data.search('messageId')+43,data.search('messageId')+11 );
    var currentState  = data.substring(data.search('currentState')+13, data.search('previousState')-1);
    var previousState  = data.substring(data.search('previousState')+14, data.search('eventId')-1);
    var eventID  = data.substring(data.search('eventId')+18, data.search('eventId')+8);
    console.log(data);
    connection.query('insert into camx_info (sender,destination,datetime,messageSchema,messageId,currentState,previousState,eventID) values ("' + sender + '", "' + destination + '", "' +
        dateTime + '", "' + messageSchema + '", "'
        + messageId + '",' + ' "' + currentState + '", "' +
        previousState + '", "' + eventID + '")',function (err, result) {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Database Updated');
        }
    });
});

//receives empty soap after each event from MSB to indicate close of one event
app.post('/notifs/acknowledgement', function (req){
    console.log(req.body);
});

//recceives heartbeat from MSB
app.post('/heartbeat', function (req, res){
    resetStatus();
    var data = req.body;
    var sender = data.substring(data.search('sender')+8,data.search('destination')-2);
    var date = new Date().toISOString();
    var XMLIPC2501 = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<soap-env:Header><IPC2501MsgInfo:MessageInfo xmlns:IPC2501MsgInfo="http://webstds.ipc.org/2501/MessageInfo.xsd" sender="AA-localhost/5000"' +
        ' destination="MSB-localhost/5000" dateTime="'+date+'" messageSchema="http://webstds.ipc.org/2541/Acknowledgement.xsd" messageId="MSB-localhost/5000|'+date+'"/>';
    var XMLIPC2501Ack = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<IPC2501Ack:Acknowledge xmlns:IPC2501Ack="http://wbstds.ipc.org/2541/Acknowledge.xsd" dateTime="'+date+'" MessageId="'+sender+'|'+date+'|0001">';
    var mime = mimeMessageMaker.mimeMessageMaker(XMLIPC2501,XMLIPC2501Ack);
    res.end(mime);
});

//receives heartbeat empty soap to indicate close of one hertbeat message
app.post('/heartbeat/acknowledgement', function (req){
    console.log(req.body);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
