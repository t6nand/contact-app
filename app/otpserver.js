var bodyParser = require('body-parser');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();

var contactList = require(__dirname + '/statics/contactlist.json');
var fetchDetails = require(__dirname + '/utils/fetchdetails.js');
var logger = require(__dirname + '/logger/jsLogger.js');
var otpManagerPath = __dirname + '/messageStatus/status.json';
var sendOTP = require(__dirname +'/managers/otpmanager.js');
var sentOTP = require(otpManagerPath);

process.setMaxListeners(0);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// contact-list page 
app.get('/send-otp.ejs', function(req, res) {
    res.render('pages/send-otp', {contactList:contactList});
});

// contact-info page
app.get('/contact-info.ejs', function(req, res) {
    fetchDetails.getQueryFromURL(req.url, function(query) {
	    try{
            fetchDetails.getRecord(query, function(record) {
    	    		res.render('pages/contact-info', {record:record});
    	    	}
    	    );
        } catch(error) {
            var err = error.toString();
            err = err.replace(/Error: /,"");
            err = JSON.parse(err);
            res.render('pages/error-info', {error:err});
        }
	});
});

// message-compose page
app.get('/message-compose.ejs', function(req, res) {
    var messageForContact = {};
    fetchDetails.getQueryFromURL(req.url, function(query) {
    	messageForContact["contact"] = query;
    	fetchDetails.getRandomSixDigitNumber(function(random) {
    		messageForContact["random"] = random;
    		res.render('pages/message-compose', {messageForContact:messageForContact});
    	});
    });
});

app.post('/send-otp', function(req, res) {
    var messageJson = {};
    messageJson["contact"] = req.body.contact;
    messageJson["text_message"] = req.body.text_message;
    sendOTP.sendmessage(messageJson, function(data) {
    	var message = {};
    	if(!(data === "error")) {
    		message["Status"] = "SUCCESS";
    		res.render('pages/otp-confirmation', {message:message})
    	} else {
    		message["Status"] = "FAILURE";
    		res.render('pages/otp-confirmation', {message:message})
    	}
    });
});

app.get('/sent-otps.ejs', function(req, res) {
    delete require.cache[require.resolve(otpManagerPath)];
    sentOTP = require(otpManagerPath);
    res.render('pages/sent-otps', {sentOTP:sentOTP});
});

app.listen(3000);
logger.info('OTP app listening on 3000.');