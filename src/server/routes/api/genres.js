const {Router} = require(`express`);
const genresControllers = require(`../../controllers/genres-controller`);

const router = new Router();

router.use(`/genres`, genresControllers);

module.exports = router;
