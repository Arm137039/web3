import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity('genres')
export class Genre {
    @PrimaryColumn()
    id!: number; // Utiliser l'id de TMDb comme clé primaire

    @Column()
    name!: string;

    @ManyToMany(() => Movie, (movie) => movie.genres)
    movies!: Movie[];
}