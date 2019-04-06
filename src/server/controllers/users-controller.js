const di = require(`../services/di`);
const usersServices = di.get('users');

const {Router} = require(`express`);

const postRouter = new Router();

postRouter.get(`/`, async ({query: {limit, skip}}, res) => res.json(await usersServices.list()));

postRouter.post(`/`, (async ({body: user}, res) => {
  const data = await usersServices.create(user);
  return res.json(data);
}));

module.exports = postRouter;
