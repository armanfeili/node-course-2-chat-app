const moment = require('moment');

const date = moment();
console.log(date.format('MMM'));
// moment().format('dddd, MMMM Do YYYY, h:mm:ss a')

console.log(date.format('MMM,Do,YYYY h:mm:ss a'));
date.add(1000, 'year');
console.log(date.format('YYYY'));
