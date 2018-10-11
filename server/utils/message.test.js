const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should create a message', () => {
    const from = 'Andrew';
    const text = 'hey there.';

    const res = generateMessage(from, text);
    expect(res.from).toBe('Andrew');
    expect(res.text).toBe('hey there.');
    expect(typeof res.createdAt).toBe('number');
  });
});
