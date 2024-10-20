import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from './Genre';

@Entity('movies')
export class Movie {
    @PrimaryColumn()
    id!: number; // Utiliser l'id de TMDb comme clé primaire

    @Column()
    title!: string;

    @Column({ type: 'text', nullable: true })
    overview!: string;

    @Column({ nullable: true })
    releaseDate!: Date;

    @Column({ nullable: true })
    posterPath!: string;

    @Column({ type: 'float', nullable: true })
    voteAverage!: number;

    @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true })
    @JoinTable()
    genres!: Genre[];
}