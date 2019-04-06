const {Router} = require(`express`);
const di = require(`../services/di`);

const booksServices = di.get('books');

const postRouter = new Router();

postRouter.get(`/`, async ({query: {limit, skip}}, res) => res.json(await booksServices.list()));

postRouter.post(`/`, (async ({body: book}, res) => {
  const data = await booksServices.create(book);
  return res.json(data);
}));

module.exports = postRouter;
