import { Router } from 'express';
import MovieController from '../controllers/MovieController';

const router = Router();

router.get('/fetch-popular', MovieController.fetchAndSavePopularMovies);
router.get('/', MovieController.getAllMovies);

export default router;