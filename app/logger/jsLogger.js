var bunyan = require('bunyan');
var date = new Date(Date.now());
var id = date.getFullYear() + "." + (parseInt(date.getMonth())+1) + "." + date.getDate();
var logger = bunyan.createLogger({
  name: 'spiders',
  streams: [{
       stream : process.stdout
  }]
});
module.exports = {
   info: function(msg){
      logger.info(msg);
    },
    warn: function(msg){
      logger.warn(msg);
    },
    debug: function(msg){
      logger.debug(msg);
    },
    error: function(msg){
      logger.error(msg);
    }
}

