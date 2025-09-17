const {test, expect, describe, it} = require('@jest/globals');

describe("Meu primero teste com Jest", () => {

    test("Deve retornar que 1 + 1 é igual a 2", () => {
        expect(1 + 1).toBe(2)
    });
    
    it ("Deve retornar a testar objeto usando operadores diferente", () => {
        const obj1 = {atributo1: 1, atributo: 2}
        expect(obj1).toEqual({atributo1: 1, atributo: 2});
        expect(obj1).toHaveProperty("atributo1");
        expect(obj1).not.toHaveProperty("nome");
        expect(obj1).toHaveProperty("atributo",2);
        expect(obj1.atributo).toBe(2);
    });
    
    it ("Deve retornar se a string existe na palavra teste com o toMatch", () => {
        expect("teste").toMatch(/e/);
    });
    
    it (" Deve testar números", () => {
        const numero = 10;
        //menor
        expect(numero).toBeLessThan(11);
    
        //menor igual
        expect(numero).toBeLessThanOrEqual(11);
    
        //igual de número fluante com arredondamento
        expect(numero).toBeCloseTo(10.0001);
        expect(numero).toBeCloseTo(9.9999);
    
        //número não é nulo
        expect(numero).not.toBeNull();

        //Não é string
        expect(numero).toHaveProperty("toString");

        //Maior
        expect(numero).toBeGreaterThan(9);

        //igual o numero
        expect(numero).toBeLessThanOrEqual(10);

        //Retorna verdadeiro ou falso no IF
        expect(numero).toBeTruthy();

        //Retorna que numero não é falso
        expect(numero).not.toBeFalsy();
    });


})
