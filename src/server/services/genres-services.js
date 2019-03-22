
/*
genre=
name
*/
let storage = [];

function create(data) {
  storage.push(data);

  return 'save genre';
}

function list() {
  return '\n' + 'GENRES' + '\n'+ storage.map((genre, index) =>
    (`${index}) name: ${genre.name}`)).join('\n')
}

module.exports = {
  create,
  list
};
