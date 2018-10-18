const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Andrew',
      room: 'The Node course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'The React course'
    }, {
      id: '3',
      name: 'Mike',
      room: 'The Node course'
    }];
  });

  it('should add a new user', () => {
    const users = new Users();

    const user = {
      id: '123',
      name: 'Andrew',
      room: 'A'
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([resUser]);
  });

  it('should remove a user', () => {
    const userId = '1';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const userId = '99';
    const user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    const userId = '2';
    const user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    const userId = '99';
    const user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
  it('should return names for node course', () => {
    const userList = users.getUserList('The Node course');
    expect(userList).toEqual(['Andrew', 'Mike']);
  });
  it('should return names for react course', () => {
    const userList = users.getUserList('The React course');
    expect(userList).toEqual(['Jen']);
  });
});
