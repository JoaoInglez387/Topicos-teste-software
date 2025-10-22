const request = require('supertest');
const {test, expect, describe, it} = require('@jest/globals');

//HTTP 
/* 
GET: Busca
GET (ID): Busca por um ID
POST: Cria
PATCH: Atualiza parcialmente
PUT: Atualiza totalmente
DELETE: Apaga
*/

it('Deve retornar as informações do cadastro, quando buscar uma pessoa existente', async () => {
    const resposta = await request('https://swapi.py4e.com/api/').get('/people/1/');
    expect(resposta.status).toBe(200);
    expect(resposta.body.height).toBeDefined();
    expect(resposta.body.films).toBeDefined();
    expect(resposta.body.vehicles.length).toBeGreaterThan(0);
    expect(resposta.body).toHaveProperty("name","Luke Skywalker");
    expect(resposta.body.name).toBe("Luke Skywalker");
    
    /*console.log(resposta.status);
    console.log(resposta.body);*/

});

it('Deve retornar mensagem de erro, quando buscar uma pessoa inexistente', async () => {
    const resposta = await request(`https://swapi.py4e.com/api/`).get(`/people/9999/`);
    expect(resposta.status).toBe(404);

    /*console.log(resposta);*/

    expect(resposta.body).toMatchObject({
        detail:'Not found'
    });  

});

it('Deve retornar as informações do planeta, quando buscar um planeta existente', async () => {
    const resposta = await request('https://swapi.py4e.com/api/').get('/planets/3/');
    expect(resposta.status).toBe(200);
    expect(resposta.body.rotation_period).toBeDefined();
    expect(resposta.body.population).toBeDefined();
    expect(resposta.body.films.length).toBeGreaterThan(0);
    expect(resposta.body).toHaveProperty("climate","temperate, tropical");
    expect(resposta.body.name).toBe("Yavin IV");

});

it('Deve retornar mensagem de erro, quando buscar uma planeta inexistente', async () => {
    const resposta = await request(`https://swapi.py4e.com/api/`).get(`/planets/9999/`);
    expect(resposta.status).toBe(404);

    /*console.log(resposta);*/

    expect(resposta.body).toMatchObject({
        detail:'Not found'
    });  

});