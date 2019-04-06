const {Router} = require(`express`);
const di = require(`../services/di`);

const genresServices = di.get('genres');

const postRouter = new Router();

postRouter.get(`/`, async ({query: {limit, skip}}, res) => res.json(await genresServices.list()));

postRouter.post(`/`, (async ({body: genre}, res) => {
  const data = await genresServices.create(genre);
  return res.json(data);
}));

module.exports = postRouter;
