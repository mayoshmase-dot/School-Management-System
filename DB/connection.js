import { Sequelize } from "sequelize";

const sequelize = new Sequelize('school', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
sequelize.sync().then(() => {
    console.log("✅ Database connected & synced successfully");
}).catch((error) => {
    console.log("❌ Unable to connect to the database:", error);
});

export default sequelize