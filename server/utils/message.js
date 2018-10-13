const moment = require('moment');
const generateMessage = (from, text) => {
  return {
    text,
    from,
    createdAt: moment().valueOf()
  };
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage,generateLocationMessage};
