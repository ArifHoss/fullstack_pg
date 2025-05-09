
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string, // 'test_db'
    process.env.DB_USER as string, // 'postgres' or your custom user
    process.env.DB_PASSWORD as string, // e.g., 'password'
    {
        host: process.env.DB_HOST || 'localhost', // 'feu24' if linked by name in Docker
        dialect: 'postgres',
        port: Number(process.env.DB_PORT) || 5432
    }
);

export default sequelize;
