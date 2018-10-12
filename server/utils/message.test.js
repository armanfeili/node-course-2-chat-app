const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should create a message', () => {
    const from = 'Andrew';
    const text = 'hey there.';
    const res = generateMessage(from, text);

    // expect(res.from).toBe('Andrew')
    // expect(res.text).toBe('hey there.')
    expect(res).toInclude({from,text});
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate a correct location object', () => {
    const from = 'Andrew';
    const latitude = 15;
    const longitude = 19;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const res = generateLocationMessage(from, latitude, longitude);

    expect(res).toInclude({from,url});
    expect(typeof res.createdAt).toBe('number');
  // expect(typeof res.latitude).toBe('number')
  // expect(typeof res.longitude).toBe('number')
  });
});
