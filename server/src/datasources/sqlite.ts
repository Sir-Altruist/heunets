import { Sequelize } from "sequelize";
import { Logger } from "../libs";
import path from "path";

const dbClient = new Sequelize({
    logging: false,
    dialect: "sqlite",
    storage: path.join(__dirname, "../database/dev.db"),
    pool: {
        max: 2,
        min: 0,
        acquire: 3000,
        idle: 0
    },
    // define: {
    //     freezeTableName: true
    // }
})

dbClient
    .sync()
    .then(() => Logger.info("Database connected successfully!"))
    .catch((err) => Logger.error(err));

export default dbClient;
