const express = require(`express`);
require(`dotenv`).config();
const routes = require(`./routes/routes`);

const app = express();
routes.init(app);
const PORT = 3001;
const HOSTNAME = 'localhost';

app.listen(PORT, HOSTNAME, () => {
  console.info(`Server running at http://${HOSTNAME}:${PORT}/`);
});
