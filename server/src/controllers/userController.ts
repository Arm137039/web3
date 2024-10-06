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
            res.status(500).json({ message: 'Erreur serveur.' });
            return;
        }
    };
    static login: RequestHandler = async (req, res, next) => {
        try {
            const {email, password} = req.body;

            // Vérifier si l'utilisateur existe
            //Todo: vérifier si l'utilisateur existe
            //Todo: si oui vérifier si le mot de passe est correct
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({message: 'Erreur serveur.'});
            return;
        }
    };
}

export default UserController;
