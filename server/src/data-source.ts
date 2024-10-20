import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Movie } from './entity/Movie';
import { Genre } from './entity/Genre';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Movie, Genre],
    migrations: ['src/migration/**/*.ts'],
    synchronize: false,
    logging: false,
    charset: 'utf8mb4',
});
AppDataSource.initialize().catch((error) => console.log(error));