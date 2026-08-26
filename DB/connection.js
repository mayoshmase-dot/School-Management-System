import { Sequelize } from "sequelize";

const sequelize = new Sequelize('freedb_82Sq5qVo', 'u_L0JrfS', 'd9X9hwJ8a0eO', {
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