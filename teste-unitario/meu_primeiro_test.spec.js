const {test, expect, describe, it} = require('@jest/globals');
test("Deve retornar que 1 + 1 é igual a 2", () => {
    expect(1 + 1).toBe(2)
});

it ("Deve retornar a igualdade de um obejto com toEqual", () => {
    const obj1 = {atributo: 1, atributo: 2}
    expect(obj1).toEqual({atributo: 1, atributo: 2})
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
})