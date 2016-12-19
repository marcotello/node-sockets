var moment = require('moment');

var now = moment();

console.log(now.format());
console.log(now.format('D-MMM-YYYY, h:mm:ss A'));

console.log('Trying the local time');

var timestamp = 1444247486704;
var timeMoment = moment.utc(timestamp);

console.log(timeMoment.format('D-MMM-YYYY, h:mm:ss A'));
console.log(timeMoment.local().format('D-MMM-YYYY, h:mm:ss A'));
