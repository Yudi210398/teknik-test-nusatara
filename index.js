import bodyParser from "body-parser";
import express from "express";
import * as dotenv from "dotenv";
import routerError from "./api/routers/routersError.js";
import sequelize from "./api/init/database.js";
import routerAdmin from "./api/routers/adminRouter.js";
import Product from "./api/model/produk.js";
import User from "./api/model/user.js";

dotenv.config();

const app = express();
// eslint-disable-next-line
const port = process.env.PORT;

(async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });
  app.use(routerAdmin);
  //! Error Middlewere
  app.use(routerError);
  // eslint-disable-next-line
  app.use(async (error, req, res, next) => {
    let pesan;
    let status;
    if (error.statusCode === 500) {
      status = error.statusCode;
      pesan = "server bermasalah / Endpoint tidak ditemukan";
      return res
        .status(status)
        .json({ error: { pesan: `${pesan + " " + status}` } });
    }

    status = error.statusCode || 401;
    pesan = error.message;
    await res
      .status(status)
      .json({ error: { pesan: `${pesan + " " + status}` } });
  });

  Product.belongsTo(User);
  User.hasMany(Product);

  sequelize
    .sync()
    .then((result) => {
      app.listen(port, () => {
        console.log("listening for requests", `konek`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
})();
