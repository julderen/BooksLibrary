const {Router} = require(`express`);
const ordersControllers = require(`../../controllers/orders-controller`);

const router = new Router();

router.use(`/orders`, ordersControllers);

module.exports = router;
