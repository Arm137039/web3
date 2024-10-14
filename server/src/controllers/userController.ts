import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
    static register: RequestHandler = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
                return;
            }

            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer l'utilisateur
            const user = await User.create({ email, password: hashedPassword });

            // Générer un token JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            res.json({ token });
            return;
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
            res.status(500).json({ message: 'Erreur serveur. register' });
            return;
        }
    };

    static login: RequestHandler = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // provisoire
            if (email === 'admin@email' && password === 'password') {
                // Générer un token JWT avec des informations spécifiques pour l'admin
                const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
                res.json({ token });
                return;
            }

            // Vérifier si l'utilisateur existe
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
                return;
            }

            // Comparer le mot de passe
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
                return;
            }

            // Générer un token JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            // Envoyer le token au client
            res.json({ token });
            return;
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({ message: 'Erreur serveur. login' });
            return;
        }
    };
}

export default UserController;
