import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sequelize", "postgres", `kawasanzombi1998`, {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`konek ke database`);
  })
  .catch((err) => {
    console.log(`koneksi gagal`, err);
  });

export default sequelize;
