import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './data-source';

import userRoutes from './routes/userRoutes';
import './jobs/updateMoviesJob';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}));

AppDataSource.initialize()
    .then(() => {
        console.log('Connecté à la base de données');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Le serveur est lancé sur le port ${port}`);
        });
    })
    .catch((error) => console.log('Erreur lors de la connexion à la base de données :', error));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);


//provisoire
app.get('/api', (req, res) => {
    res.send('Bonjour, monde !');
    console. log("halo register");
});
