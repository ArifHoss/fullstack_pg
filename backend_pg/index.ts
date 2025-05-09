import express from 'express';
import cors from 'cors';
import TaskRoutes from './routes_controller/TaskRoutes';
import UserRoutes from './routes_controller/UserRoutes';
import sequelize from './sequelize';
import './models/Task';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/tasks', TaskRoutes);
app.use('/users', UserRoutes)

const start = async () => {
    try {
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`SERVER IS UPP AND RUNNING ON: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};
// start() // this work as well.

start().catch((err) => {
    console.error('Failed to start server:', err);
});
