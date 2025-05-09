import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255], // Ensure title is not empty and not too long
            },
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: 'tasks',
        timestamps: false,
    }
);

export default Task;