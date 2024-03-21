import dontenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import signale from "signale";

dontenv.config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT as string) || 3306,
    models: [__dirname + '/**/*.model.ts']
})

const syncConnection = async () => {
    try {
        await sequelize.sync();
            signale.success('Models synchronized successfully');
    } catch (error) {
        signale.error(error);
    }
}

export default syncConnection;
