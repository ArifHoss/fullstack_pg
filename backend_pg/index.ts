import express from 'express';
import cors from 'cors';
import taskRoutes from './routes_controller/TaskRoutes';
import sequelize from './sequelize';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`SERVER IS UPP AND RUNNING ON: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
