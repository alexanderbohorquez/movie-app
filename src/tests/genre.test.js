const request = require('supertest');
const app = require('../app')
require('../models')

let id;


test("GET / genres debe traer todos los generos", async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("post / genres debe retornar estatus 200", async () => {
    const genres = {
        name: "Crimensito"
    }
    const res = await request(app).post('/genres').send(genres);
    console.log(res.body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

test("put / genres/:id debe actualizar la genres", async () => {
    const genresUpdate = {
        name: "Crimenaso"
    }
    const res = await request(app).put(`/genres/${id}`).send(genresUpdate);
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genresUpdate.name)
})


test("delete/genres/:id debe retornar eliminar los generos", async () => {
    const res = await request(app).delete(`/genres/${id}`)
    console.log(res.body);
    expect(res.status).toBe(204)
})