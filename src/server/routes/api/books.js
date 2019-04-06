const {Router} = require(`express`);
const booksControllers = require(`../../controllers/books-controller`);

const router = new Router();

router.use(`/books`, booksControllers);

module.exports = router;
