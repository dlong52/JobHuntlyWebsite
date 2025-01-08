const dotenv = require('dotenv');
dotenv.config();

const userRouter = require("./UserRouter");
const authRouter = require("./AuthRouter");
const categoryRouter = require("./CategoryRouter")
const jobRouter = require("./JobRouter");
const roleRouter = require("./RoleRouter");
const applicationRouter = require("./ApplicationRouter");
const cvRouter = require("./CvRouter");

const prefixApi = process.env.PREFIX_API
const routes = (app) => {
  app.use(`${prefixApi}/auth`, authRouter);
  app.use(`${prefixApi}/role`, roleRouter);
  app.use(`${prefixApi}/user`, userRouter);
  app.use(`${prefixApi}/category`, categoryRouter);
  app.use(`${prefixApi}/job`, jobRouter);
  app.use(`${prefixApi}/cv`, cvRouter);
  app.use(`${prefixApi}/application`, applicationRouter);
};
module.exports = routes;
