# contact-app
This project aims to develop a web app that can send an OTP (via SMS) to a list of contacts, one at a time.

Documentation

Overview: 

This is a node.js based web app meant to send OTP to list of contacts one at a time. It provides options to list contacts and on choosing a contact, it’s detailed information is provided. Subsequently, OTP message is sent to the concerned contact which happens to be a random 6 digit number. All successfully sent messages are saved which can be accessed by List of OTP sent option. All errors are currently reported on console and written to an error file. 

Setting up : 

1. Clone repository from : https://github.com/t6nand/contact-app.git.
2. If node.js is not installed on your system, install Node.js with npm.  https://nodejs.org/en/download/. 
3. After installation is completed, run npm install in the home directory of project from terminal/command prompt. This will install all dependencies locally. 
4. Start the application with npm run start.
5. Hit localhost:3000 on your machine & voila! you are all set up.

Libraries used : 
Here are listed some important libraries used with there advantages. 

1. Bunyan: This library is used to create logger for node application. It’s logger can be customised to show various important parameters along with plain log message like process id of application, time of log created, etc. Best thing about bunyan logger is it’s ability to enable central logging in distributed application scenario running on various machines which is easy to set up.
NOTE: “If using rotating file option, please ensure there is an empty 	    application.log file present in logs folder relative to parent directory of project. i.e. if abc is parent directory, create empty application.log in abc/logs/application.log.”

2. Body Parser: This library is a simple implementation to allow efficient handling of POST request received by node server. 
3. EJS: This library is used to allow server to use  view engine as ‘ejs’. All the pages in view have pjs format.
4. Express: This module is used to handle routing in server. 
5. Twilio: This library is a simple REST API of Twilio for node.js so as to send text message like OTPs, etc, using this API. 

Coding Practices: 

1. Modularity of code: All atomic operations are mostly assigned to different modular methods/functions. This will make code easy to understand.
2. Using explanatory declarations: Variables and methods are named so as to imply it’s usage.

Decisions Made: 

Whenever a server loads a module or static file, it caches that entity in memory. 
Thus to keep server updated with list of messages sent, it was important to ensure that server always had an updated copy of the file so as to provide up to dated information in view when list of OTP sent is clicked. This was done by clearing cache for this file where all sent message are written, whenever this route will be hit and reloading module for this file so as to keep server with a fresh copy of this file in it’s cache and provide consistent data whenever route is accessed. 
