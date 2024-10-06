import axios from 'axios';

const apiKey = process.env.TMDB_API_KEY;

export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: apiKey,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Erreur lors de la récupération des films populaires:', error);
        throw error;
    }
};