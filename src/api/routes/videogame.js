const { isAuth, isAdmin } = require('../../middlewares/auth');
const { postVideogame, getVideogame, getVideogameById, putVideogame, deleteVideogame, getVideogamesAdmin } = require('../controllers/videogames');
const videogameRoutes = require('express').Router();

videogameRoutes.get('/notVerified', [isAdmin], getVideogamesAdmin);
videogameRoutes.get('/', getVideogame);
videogameRoutes.get('/:id', getVideogameById);
videogameRoutes.put('/:id', [isAdmin], putVideogame);
videogameRoutes.delete('/:id', [isAdmin], deleteVideogame);
videogameRoutes.post('/', [isAuth], postVideogame);

module.exports = videogameRoutes;