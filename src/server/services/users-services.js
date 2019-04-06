const timeSpend = require(`./timeSpend`);
const { Users, Orders, Genres,Books } = require(`./db`);

/*
user=
name,
surname,
address
phone,
*/
const userToString = ({name, surname, address, phone}) => `${name} ${surname} phone: ${phone} address: ${address}`

class usersServices {
  async create(data) {
    timeSpend.startTimer();
    await Users.create(data);
    timeSpend.endTimer();
    return 'save user';
  }

  async list() {
    timeSpend.startTimer();
    const list = await Users.findAll({ include: [{ model: Orders, include: [Books]}]});

    const toString = '\n' + 'USERS' + '\n'+ list.map((user, index) =>
      (`${user.id}) ${userToString(user)}`)).join('\n');
    timeSpend.endTimer();

    return list
  }

}

module.exports = usersServices;
