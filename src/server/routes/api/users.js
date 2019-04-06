const {Router} = require(`express`);
const usersControllers = require(`../../controllers/users-controller`);

const router = new Router();

router.use(`/users`, usersControllers);

module.exports = router;
