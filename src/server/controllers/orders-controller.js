const di = require(`../services/di`);
const ordersServices = di.get('orders');

const {Router} = require(`express`);

const postRouter = new Router();

postRouter.get(`/`, async ({query: {limit, skip}}, res) => res.json(await ordersServices.list()));

postRouter.post(`/`, (async ({body: order}, res) => {
  const data = await ordersServices.create(order);
  return res.json(data);
}));

module.exports = postRouter;
