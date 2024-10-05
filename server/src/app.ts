import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import './jobs/updateMoviesJob';

dotenv.config();


const app = express();
const port = process.env.PORT || 5173;

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
app.use(cors({
    origin: 'http://localhost:5173', // Adresse du frontend ViteJS
}));
*/

app.use('/users', userRoutes);


// Route de base
app.get('/api', (req, res) => {
    res.send('Bonjour, monde !');
    console. log("halo register");
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});
