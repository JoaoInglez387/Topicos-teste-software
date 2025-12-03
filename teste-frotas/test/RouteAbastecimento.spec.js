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
    

// Caso de teste
    it("Deve Autenticar na API - Usando o ADMIN", async () => {
        const dados = await req
        .post('/login')
        .send({
            credencial:API_USER_ADMIN,
            senha:API_PASS
        })
        .set('Accept','application/json');
        //Afirmação de que o status da resposta deve ser 200
        expect(dados.status).toBe(200);
        //Afirmo que na resposta esteja definado o token
        expect(dados.body.data.token).toBeDefined();
        //Armazena o token da resposta na variavel token
        token = dados.body?.data?.token;
        //console.log(token);
        //console.log("Status Login",dados.status, '\nLogin Body:',dados.body);
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
        //console.log(resposta.body.data[0]._id);
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
            data_abastecimento: "2044-01-16T17:30:36.657Z",
            tipo_combustivel: "DIESEL_COMUM_S500",
            posto_combustivel: "Posto do Zé",
            litragem: 500,
            valor_total: 1000,
            valor_litro: 2.1,
            km_hora_atual: 541154,
            reserva: "68e961333823059a40134324"
        }
    
        const resposta = await req 
            .post(`/abastecimentos`)
            .send(novoAbastecimento)
            .set("Authorization",`Bearer ${token}`);
        //console.log(resposta.body);
        expect(201);
        expect(resposta.status).toBe(201);
        expect(resposta.body.data.veiculo).toBe(novoAbastecimento.veiculo);
        abastecimentoID = resposta.body.data._id;
    });
    
    //Path
    it("Deve atualizar um abastecimento por ID", async () => {
        const abastecimentoPath = {
            posto_combustivel: "Posto do Zé",
            litragem: 535,
            km_hora_atual: 5724,
        }

        const dados = await req 
            .put(`/abastecimentos/${abastecimentoID}`)
            .set("Accept", "application/json")
            .set("Authorization",`Bearer ${token}`)
            .expect("content-type", /json/)
            .expect(200);

        expect(dados.status).toBe(200);
        expect(dados.body?.data?.posto_combustivel).toEqual(abastecimentoPath.posto_combustivel);
        expect(dados.body.data.litragem).toBe(abastecimentoPath.litragem);
        expect(dados.body.data.km_hora_atual).toBe(abastecimentoPath.km_hora_atual);
    });

    //Delete
    it("Deve excluir um abastecimento por ID", async () => {
        const dados = await req
            .delete(`/abastecimentos/${abastecimentoID}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect("content-type", /json/)
            .expect(200);

        expect(dados.status).toBe(200);
    })


})