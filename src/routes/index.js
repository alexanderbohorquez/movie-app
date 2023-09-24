const express = require('express');
const movieRouter = require('./movie.router');
const directorRouter = require('./director.router');
const actorRouter = require('./actor.router');
const genreRouter = require('./genre.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/movies', movieRouter);
router.use('/directors', directorRouter);
router.use('/actors', actorRouter);
router.use('/genres', genreRouter);

module.exports = router;