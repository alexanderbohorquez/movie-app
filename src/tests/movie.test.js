const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
require('../models')

let id;


test("GET / movies debe traer todos las peliculas", async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("post / movies debe retornar estatus 200", async () => {
    const movies = {
        name: "Pulp Fiction",
        image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hNcQAuquJxTxl2fJFs1R42DrWcf.jpg",
        synopsis: "Jules y Vincent, dos asesinos a sueldo con muy pocas luces, trabajan para Marsellus Wallace. Vincent le confiesa a Jules que Marsellus le ha pedido que cuide de Mia, su mujer. Jules le recomienda prudencia porque es muy peligroso sobrepasarse con la novia del jefe. Cuando llega la hora de trabajar, ambos deben ponerse manos a la obra. Su misión: recuperar un misterioso maletín",
    releaseYear: 1994
    }
    const res = await request(app).post('/movies').send(movies);
    console.log(res.body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

test("put / movies/:id debe actualizar la movies", async () => {
    const moviesUpdate = {
        name: "Pulp FictionSASO",
    }
    const res = await request(app).put(`/movies/${id}`).send(moviesUpdate);
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(moviesUpdate.name)
})

test('POST /movies/:id/actors debe insertar las peliculas de un actor', async () => {
    const actorData = {
        firstName: "Samuelito",
        lastName: "Jackson" 
    };
    const actor = await Actor.create(actorData);
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    console.log(res.body); 
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genre debe insertar los géneros de una película', async () => {
    const genreData = {
        name: "Crimensito"
    };
    const genre = await Genre.create(genreData); 
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    console.log(res.body); 
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});


test('POST /movies/:id/directors debe insertar los directores de una película', async () => {
    const directorData = {
        firstName: "Samuelito",
        lastName: "Jackson" 
    };
    const director = await Director.create(directorData); 
    const res = await request(app)
        .post(`/movies/${id}/directors`) 
        .send([director.id]);
    console.log(res.body); 
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});


test("delete/movies/:id debe retornar eliminar lasl peliculas", async () => {
    const res = await request(app).delete(`/movies/${id}`)
    console.log(res.body);
    expect(res.status).toBe(204)
})

