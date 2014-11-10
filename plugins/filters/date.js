var moment = require('moment');

module.exports = function(date, format) {
  if (!date) {
    return '';
  }
  var s = moment.utc(date).format(format);
  return s;
};
