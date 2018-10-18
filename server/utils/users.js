class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    const user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    //   const users = this.users.filter((user) => user.id !== id)
    //   this.users = users

    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser (id) {
    const user = this.users.filter((user) => user.id === id)[0];
    return user;
  }

  getUserList (room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

// const me = new Users()
// const red = me.addUser('123', 'Arman', 'A')
// console.log(red)

module.exports = {Users};
