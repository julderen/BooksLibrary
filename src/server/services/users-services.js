const timeSpend = require(`./timeSpend`);

/*
user=
name,
surname,
address
phone,
*/
const userToString = ({name, surname, address, phone}) => `${name} ${surname} phone: ${phone} address: ${address}`

class usersServices {
  constructor(){
    this.storage = []
  }

  create(data) {
    const user = this.storage.find(({ phone }) => phone === data.phone);
    if (user) {
      return `A user with such a phone exists (${userToString(user)})`;
    }

    timeSpend.startTimer();
    this.storage.push(data);
    timeSpend.endTimer();
    return 'save user';
  }

  list() {
    timeSpend.startTimer();
    const list = '\n' + 'USERS' + '\n'+ this.storage.map((user, index) =>
      (`${index}) ${userToString(user)}`)).join('\n')
    timeSpend.endTimer();

    return list
  }

}

module.exports = usersServices;
