const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./UserRouter");
const authRouter = require("./AuthRouter");
const categoryRouter = require("./CategoryRouter");
const jobRouter = require("./JobRouter");
const levelRouter = require("./LevelRouter");
const roleRouter = require("./RoleRouter");
const applicationRouter = require("./ApplicationRouter");
const cvRouter = require("./CvRouter");
const notificationRouter = require("./NotificationRouter");
const companyRouter = require("./CompanyRouter");
const nodemailerRouter = require("./NodemailerRouter");
const packageRouter = require("./PackageRouter");

const prefixApi = process.env.PREFIX_API;
const routes = (app) => {
  app.use(`${prefixApi}/auth`, authRouter);
  app.use(`${prefixApi}/role`, roleRouter);
  app.use(`${prefixApi}/user`, userRouter);
  app.use(`${prefixApi}/category`, categoryRouter);
  app.use(`${prefixApi}/job`, jobRouter);
  app.use(`${prefixApi}/cv`, cvRouter);
  app.use(`${prefixApi}/application`, applicationRouter);
  app.use(`${prefixApi}/level`, levelRouter);
  app.use(`${prefixApi}/notify`, notificationRouter);
  app.use(`${prefixApi}/company`, companyRouter);
  app.use(`${prefixApi}/nodemailer`, nodemailerRouter);
  app.use(`${prefixApi}/package`, packageRouter);
};
module.exports = routes;
