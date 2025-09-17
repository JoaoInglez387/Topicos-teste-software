const {test, expect, describe, it} = require('@jest/globals');
const  { soma, subtracao, multiplicacao, divisao } = require("./calculadora")

describe("Teste de calculadora com valor inteiro", () => {
    test("Deve retornar a soma de dois valores", () => {
        const esperado = 30;
        const retornado = soma(10,20);
        expect(retornado).toBe(esperado)
    });

    test("Deve retornar a subtração de dois valores", () => {
        const esperado = 10;
        const retornado = subtracao(20,10);
        expect(retornado).toBe(esperado)
    });

    test("Deve retornar a multiplicação de dois valores", () => {
        const esperado = 200;
        const retornado = multiplicacao(20,10);
        expect(retornado).toBe(esperado)
    });

    test("Deve retornar a divisão de dois valores", () => {
        const esperado = 2;
        const retornado = divisao(20,10);
        expect(retornado).toBe(esperado)
    });
});

describe("Teste de calculadora com valor negativo", () => {
    it ("Deve retornar a soma de dois valores", () => {
        const esperado = 10;
        const retornado = soma(-10,20);
        expect(retornado).toBe(esperado)
    });

    it("Deve retornar a subtração de dois valores", () => {
        const esperado = -30;
        const retornado = subtracao(-20,10);
        expect(retornado).toBe(esperado)
    });

    it("Deve retornar a multiplicação de dois valores", () => {
        const esperado = -200;
        const retornado = multiplicacao(-20,10);
        expect(retornado).toBe(esperado)
    });

    it("Deve retornar a divisão de dois valores", () => {
        const esperado = -2;
        const retornado = divisao(-20,10);
        expect(retornado).toBe(esperado)
    });
});

describe("Teste de calculadora com erros possível do úsuario", () => {
    it ("Deve retorna erro de divisão não pode ser por zero", () => {
        expect(() => divisao(10,0).toThrow("Divisor Invalido"));
    });

    it.skip ("Teste de erro", () => {
        expect(divisao(10,0));
    });

    it("Deve retornar erro por texto em campo de soma", () => {
        expect(() => soma("10",10).toThrow("Campo invalido para texto"));
        expect(() => soma(10,"10").toThrow("Campo invalido para texto"));
    });

    it("Deve retornar erro por texto em campo de subtração", () => {
        expect(() => subtracao("10",10).toThrow("Campo invalido para texto"));
        expect(() => subtracao(10,"10").toThrow("Campo invalido para texto"));
    });

    it("Deve retornar erro por texto em campo de multiplicação", () => {
        expect(() => multiplicacao("10",10).toThrow("Campo invalido para texto"));
        expect(() => multiplicacao(10,"10").toThrow("Campo invalido para texto"));
    });

    it("Deve retornar erro por texto em campo de divisão", () => {
        expect(() => divisao("10",10).toThrow("Campo invalido para texto"));
        expect(() => divisao(10,"10").toThrow("Campo invalido para texto"));
    });
});