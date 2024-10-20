import axios from 'axios';

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
    baseURL: baseUrl,
    params: {
        api_key: apiKey,
        language: 'fr-FR', // Vous pouvez changer la langue si vous le souhaitez
    },
});

export default tmdbApi;