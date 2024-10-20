import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import 'reflect-metadata';
import { AppDataSource } from './data-source';

import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import './jobs/updateMoviesJob';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}));

AppDataSource.initialize()
    .then(() => {
        console.log('Connecté à la base de données');
    })
    .catch((error) => console.log('Erreur lors de la connexion à la base de données :', error));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

app.use('/api/movies', movieRoutes);

//provisoire
app.get('/api', (req, res) => {
    res.send('Bonjour, monde !');
    console. log("halo register");
});
