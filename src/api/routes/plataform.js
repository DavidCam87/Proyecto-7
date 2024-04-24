const { isAdmin } = require('../../middlewares/auth');
const { getPlataform, getPlataformById, putPlataform, postPlataform, deletePlataform } = require('../controllers/plataform');
const plataformRoutes = require('express').Router();

plataformRoutes.get('/', getPlataform);//Read
plataformRoutes.get('/:id', getPlataformById);//Read by ID
plataformRoutes.put('/:id', [isAdmin], putPlataform);//Update
plataformRoutes.post('/', [isAdmin], postPlataform);//Create
plataformRoutes.delete('/:id', [isAdmin], deletePlataform);//Delete

module.exports = plataformRoutes;