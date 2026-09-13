import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      connectTimeout: 60000
    }
  }
  
);

sequelize.sync({alter:true}).then(() => {
    console.log("✅ Database connected & synced successfully");
}).catch((error) => {
    console.log("❌ Unable to connect to the database:", error);
});


export default sequelize;