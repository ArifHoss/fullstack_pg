import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100], // Ensure name is at least 3 characters
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Enforce uniqueness
            validate: {
                isEmail: true, // Validate email format
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100], // Ensure password is at least 6 characters
            },
        },
    },
    {
        tableName: 'users',
        timestamps: false,
    }
);

export default User;