var moment = require('moment');

module.exports = function(date, format) {
  if (!date) {
    return '';
  }
  var s = moment.utc(new Date(date)).format(format);
  return s;
};
