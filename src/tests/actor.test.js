const request = require('supertest');
const app = require('../app')
require('../models')

let id;


test("GET / actors debe traer todos los actores", async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("post / actors debe retornar estatus 200", async () => {
    const actors = {
        firstName: "Samuel",
        lastName: "Jackson",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/300px-SamuelLJackson.jpg",
        birthday : "1948-12-21"
    }
    const res = await request(app).post('/actors').send(actors);
    console.log(res.body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

test("put / actors/:id debe actualizar la actors", async () => {
    const actorsUpdate = {
        firstName: "Samuelito"
    }
    const res = await request(app).put(`/actors/${id}`).send(actorsUpdate);
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(actorsUpdate.name)
})


test("delete/actors/:id debe retornar eliminar la actors", async () => {
    const res = await request(app).delete(`/actors/${id}`)
    console.log(res.body);
    expect(res.status).toBe(204)
})