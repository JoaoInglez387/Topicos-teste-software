//importação das bibliotecas
const {it, expect, describe} = require ("@jest/globals");
const request = require ("supertest");
//carrega as variaveis para o projeto
require ('dotenv').config();
//organiza os testes em um bloco
describe(" teste de integração - Secretaria frotas", () => {
    const BASE_URL = process.env.API_BASE_URL;
    const API_USER = process.env.API_USER;
    const API_PASS = process.env.API_PASS;
    const req = request(BASE_URL);
    let token;
//caso de teste
    it (" Deve Autenticar na api", async () => {
        const dados = await req
        .post('/login')
        .send({
            crendencial:API_USER,
            senha:API_PASS
        })
        .set('Acept', 'application/json');
        //definição do que o status da resposta deve ser 200
        expect (dados.status).toBe(200);
        //afirmo que na resposta esteja definido o token
        expect (dados.body.data.token).toBeDefined();
        //armazema o token da resposta na variavel token
        token = dados.body?.data?.token;
        console.log(token)



       // console.log('Status login', dados.status, '\nLogin Body:', dados.body);
    })
})