const request = require('supertest');
const app = require('../app')
require('../models')

let id;


test("GET / directors debe traer todos los estudiantes", async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("post / directors debe retornar estatus 200", async () => {
    const directors = {
        firstName: "Samuel",
        lastName: "Jackson",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/300px-SamuelLJackson.jpg",
        birthday : "1948-12-21"
    }
    const res = await request(app).post('/directors').send(directors);
    console.log(res.body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

test("put / directors/:id debe actualizar la directors", async () => {
    const directorsUpdate = {
        firstName: "Samuelito"
    }
    const res = await request(app).put(`/directors/${id}`).send(directorsUpdate);
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(directorsUpdate.name)
})


test("delete/directors/:id debe retornar eliminar los actors", async () => {
    const res = await request(app).delete(`/directors/${id}`)
    console.log(res.body);
    expect(res.status).toBe(204)
})