const {it, expect, describe} = require ('@jest/globals');
const request =  require ("supertest");

require('dotenv').config();

const data = new Date();

describe("Teste de Integração - Abastecimentos", () => {
    const BASE_URL = process.env.API_BASE_URL;
    const API_USER_ADMIN = process.env.API_USER_ADMIN;
    const API_PASS = process.env.API_PASS;
    const req = request(BASE_URL);
    let token;
    let abastecimentoID;
    let veiculo;
    

// Caso de teste
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


    //get
    it("Deve retornar uma lista de abastecimentos dos veiculos", async () => {
        const resposta = await req
        .get("/abastecimentos")
        .set('Accept','application/json')
        .set("Authorization",`Bearer ${token}`)
        .expect(200);
        expect(resposta.status).toBe(200);

        abastecimentoID = resposta.body.data[0]._id
        veiculo = resposta.body.data[0].veiculo._id;
    });

    //Get ID
    it("Deve retornar um abastecimento com base no id", async () => {
        const resposta = await req 
        .get(`/abastecimentos/${abastecimentoID}`)
        .set('Accept','application/json')
        .set("Authorization",`Bearer ${token}`)
        .expect(200);
        expect(resposta.status).toBe(200);
        //console.log(resposta.body);

    });

     //Post
    test("Deve criar um abastecimento com sucesso", async () => {

        const novoAbastecimento = {
            veiculo: "68e961273823059a4013249e",
            data_abastecimento: "2025-11-12T05:11:00.000Z",
            tipo_combustivel: "GASOLINA_ADITIVADA",
            posto_combustivel: "Martins-Moreira Combustíveis",
            litragem: 40,
            valor_total: 220,
            valor_litro: 5.5,
            km_hora_atual: 465,
            reserva: "68e961333823059a40134324"
        }
    
        const resposta = await req 
        .post(`/abastecimentos`)
        .send(novoAbastecimento)
        .set("Authorization",`Bearer ${token}`);
        console.log(resposta.body);

        /* expect(201);
        expect(resposta.status).toBe(201);
        expect(resposta.body.data.veiculo).toBe(novoAbastecimento.veiculo); */
    });
    


})