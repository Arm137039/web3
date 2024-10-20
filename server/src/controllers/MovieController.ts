import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Movie } from '../entity/Movie';
import { Genre } from '../entity/Genre';
import tmdbApi from '../services/tmdbService';

class MovieController {
    static fetchAndSavePopularMovies = async (req: Request, res: Response) => {
        try {
            const response = await tmdbApi.get('/movie/popular');

            const moviesData = response.data.results;

            const movieRepository = AppDataSource.getRepository(Movie);
            const genreRepository = AppDataSource.getRepository(Genre);

            const genreResponse = await tmdbApi.get('/genre/movie/list');
            const genreList = genreResponse.data.genres;

            // Stocker les genres dans un Map pour un accès rapide
            const genresMap = new Map<number, Genre>();

            for (const genreData of genreList) {
                let genre = await genreRepository.findOneBy({ id: genreData.id });
                if (!genre) {
                    genre = new Genre();
                    genre.id = genreData.id;
                    genre.name = genreData.name;
                    await genreRepository.save(genre);
                }
                genresMap.set(genre.id, genre);
            }
            // Définir le nombre de pages à récupérer
            const totalPages = 5; // Vous pouvez ajuster ce nombre
            for (let page = 1; page <= totalPages; page++) {
                // Récupérer les films populaires pour la page actuelle
                const response = await tmdbApi.get('/movie/popular', {
                    params: {
                        page: page,
                    },
                });

                const moviesData = response.data.results;

                for (const movieData of moviesData) {
                    // Traiter les genres
                    const genreIds = movieData.genre_ids;
                    const genres: Genre[] = [];

                    for (const genreId of genreIds) {
                        const genre = genresMap.get(genreId);
                        if (genre) {
                            genres.push(genre);
                        }
                    }

                    // Vérifier si le film existe déjà
                    const existingMovie = await movieRepository.findOneBy({ id: movieData.id });
                    if (!existingMovie) {
                        const movie = new Movie();
                        movie.id = movieData.id;
                        movie.title = movieData.title;
                        movie.overview = movieData.overview;
                        movie.releaseDate = movieData.release_date ? new Date(movieData.release_date) : null;
                        movie.posterPath = movieData.poster_path;
                        movie.voteAverage = movieData.vote_average;
                        movie.genres = genres;

                        await movieRepository.save(movie);
                    }
                }
            }

            res.json({ message: 'Films populaires sauvegardés avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la récupération ou de la sauvegarde des films :', error);
            res.status(500).json({ message: 'Erreur serveur.' });
        }
    };
    static getAllMovies = async (req: Request, res: Response) => {
        try {
            const movieRepository = AppDataSource.getRepository(Movie);
            const movies = await movieRepository.find({ relations: ['genres'] });
            res.json(movies);
        } catch (error) {
            console.error('Erreur lors de la récupération des films :', error);
            res.status(500).json({ message: 'Erreur serveur.' });
        }
    };
}
export default MovieController;