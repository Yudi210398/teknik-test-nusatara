import { DataTypes } from "sequelize";
import sequelize from "../init/database.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

export default User;
