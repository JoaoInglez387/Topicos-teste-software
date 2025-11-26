//Importações das bibliotecas
const {it, expect, describe} = require ('@jest/globals');
const request =  require ("supertest");
const { faker } = require("@faker-js/faker/locale/pt_BR");

//Carrega as variaveis para o projeto
require('dotenv').config();

//Data de hoje
const data = new Date();

//Organiza os testes em um bloco
describe("Teste de Integração - Sinistro Frotas", () => {
    const BASE_URL = process.env.API_BASE_URL;
    const API_USER_ADMIN = process.env.API_USER_ADMIN;
    const API_PASS = process.env.API_PASS;
    const req = request(BASE_URL);
    let token;
    let sinistroId;
    let motorista;
    let veiculo;

//Caso de teste
    it("Deve Autenticar na API - Usando o ADMIN", async () => {
        const dados = await req
        .post('/login')
        .send({
            credencial:API_USER_ADMIN,
            senha:API_PASS
        })
        .set('Accept','application/json');

        expect(dados.status).toBe(200);
        expect(dados.body.data.token).toBeDefined();
        token = dados.body?.data?.token;
        //console.log(token);

    });

    it("Deve retornar uma lista de sinistros (Acidentes inprevisiveis)", async () => {
        const resposta = await req 
        .get("/sinistros")
        .set('Accept','application/json')
        .set("Authorization",`Bearer ${token}`)
        .expect(200);
        expect(resposta.status).toBe(200);
        sinistroId = resposta.body.data[0]._id;
        motorista = resposta.body.data[0].motorista._id;
        veiculo = resposta.body.data[0].veiculo._id;

    });

    it("Deve retornar um sinistro com base no id", async () => {
        const resposta = await req 
        .get(`/sinistros/${sinistroId}`)
        .set('Accept','application/json')
        .set("Authorization",`Bearer ${token}`)
        .expect(200);
        expect(resposta.status).toBe(200);
        //console.log(resposta.body);
    });

    //Post
    it.skip("Deve criar um sinistro com sucesso", async () => {
        const data = new Date();

        const novoSinistro = {
            tipo_sinistro: "Incêndios",
            data_sinistro: data,
            local_sinistro: "Lugar do Nunca",
            descricao: "Sinistro para teste",
            veiculo: veiculo,
            motorista: motorista,
            fotos: ["/arquivos/000000000000000000000000/cafe.jpg"],
            responsavel_analise: "Carlinhos da Silva"
        }
    
        const resposta = await req 
        .post(`/sinistros`)
        .send(novoSinistro)
        .set("Authorization",`Bearer ${token}`);
        console.log(resposta.body);

        expect(resposta.status).toBe(201);
        expect(resposta.body.data.tipoSinistro).toBe(novoSinistro.tipo_sinistro);
    });

    //Path
    it.skip("Deve atualizar um sinistro por ID", async () => {
        const sinistroPatch = {
            descricao: "Não sei o que é?",
            responsavel_analise: "Roberto Nogueira"
        };

        const dados = await req
            .patch(`/sinistros/${sinistroId}`)
            .send(sinistroPatch)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect("content-type", /json/)
            .expect(200);

        expect(dados.status).toBe(200);
        expect(dados.body?.data?.descricao).toEqual(sinistroPatch.descricao);
        expect(dados.body?.data?.responsavel_analise).toEqual(sinistroPatch.responsavel_analise);
    });

    //Delete
    it.skip("Deve excluir um sinistro por ID", async () => {

        const dados = await req
        .delete(`/sinistros/${sinistroId}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("content-type", /json/)
        .expect(200);

        //console.log(dados.body);

        expect(dados.status).toBe(200);
    });

});