// import { Sequelize } from "sequelize";

// // const sequelize = new Sequelize(
// //   process.env.DB_NAME as string,
// //   process.env.DB_USER as string,
// //   process.env.DB_PASS as string,
// //   {
// //     host: process.env.DB_HOST,
// //     dialect: "postgres", // Add this line
// //     port: parseInt(process.env.DB_PORT || "5432"),
// //     // Optional: Add pooling options
// //     pool: {
// //       max: 5,
// //       min: 0,
// //       acquire: 30000,
// //       idle: 10000,
// //     },
// //   }
// // );

// const sequelize = new Sequelize(
//   "postgresql://neondb_owner:npg_x9Lwyvmc8gTJ@ep-flat-meadow-adnpq7ou-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
// );

import User from "../models/User";
// (async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync({ alter: true });
//   } catch (error) {
//     console.log(error);
//   }
// })();

// export default sequelize;

import { Sequelize } from "sequelize";
import pg from "pg";
const DATABASE_URL =
  "postgresql://neondb_owner:npg_x9Lwyvmc8gTJ@ep-flat-meadow-adnpq7ou-pooler.c-2.us-east-1.aws.neon.tech/neondb";

const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: "postgres",
  dialectModule: pg, // explicitly use pg
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // needed for Neon
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Database connection established");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
})();

export default sequelize;
