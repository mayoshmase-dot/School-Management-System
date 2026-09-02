import { Sequelize } from "sequelize";

const sequelize = new Sequelize('freedb_m827AF7c', 'u_nYmeTI', 'iGqwCYJC43gJ', {
    host: 'sql.freedb.tech',
      port: 3306,
    dialect: 'mysql'
});
sequelize.sync().then(() => {
    console.log("✅ Database connected & synced successfully");
}).catch((error) => {
    console.log("❌ Unable to connect to the database:", error);
});

export default sequelize