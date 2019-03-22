/*
user=
name,
surname,
address
phone,
*/
let storage = [];
const userToString = ({name, surname, address, phone}) => `${name} ${surname} phone: ${phone} address: ${address}`
function create(data) {
  const user = storage.find(({ phone }) => phone === data.phone);
  if (user) {
    return `A user with such a phone exists (${userToString(user)})`;
  }

  storage.push(data);

  return 'save user';
}

function list() {
  return '\n' + 'USERS' + '\n'+ storage.map((user, index) =>
    (`${index}) ${userToString(user)}`)).join('\n')
}

module.exports = {
  create,
  list
};
