import { RequestHandler } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static register: RequestHandler = async (req, res, next) => {
        try {
            const { firstName, lastName, email, nickname, password, birthDate, streamingProviders } = req.body;
            const userRepository = AppDataSource.getRepository(User);

            const existingUser = await userRepository.findOneBy({ email });
            if (existingUser) {
                res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
                return;
            }

            const existingNickname = await userRepository.findOneBy({ nickname });
            if (existingNickname) {
                res.status(400).json({ message: 'Ce surnom est déjà utilisé.' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.nickname = nickname;
            user.password = hashedPassword;
            user.birthDate = new Date(birthDate);
            user.streamingProviders = streamingProviders;

            await userRepository.save(user);

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
            res.status(500).json({ message: 'Erreur serveur. register' });
        }
    };

    static login: RequestHandler = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // provisoire
            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
                res.json({ token });
                return;
            }

            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.findOneBy({ email });
            if (!user) {
                res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
                return;
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.json({ token });

        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({ message: 'Erreur serveur. login' });;
        }
    };
}

export default UserController;
