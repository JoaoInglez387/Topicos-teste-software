const soma = (a,b) => {
    if (typeof a == "string" || typeof b == "string") {
        throw new Error ("O número é texto!")
    }  
    return a+b
}

const subtracao = (a,b) => {
    if (typeof a == "string" || typeof b == "string") {
        throw new Error ("O número é texto!")
    }  
    return a-b
}

const multiplicacao = (a,b) => {
    if (typeof a == "string" || typeof b == "string") {
        throw new Error ("O número é texto!")
    }  
    return a*b
}

const divisao = (dividendo, divisor) => {
    if (divisor == 0) {
        throw new Error ("Divisor Invalido")
    } 
    else {
        if (typeof dividendo == "string" || typeof divisor == "string") {
            throw new Error ("O número é texto!")
        }  
        return dividendo / divisor
    }
    
}

module.exports = {
    soma,
    subtracao,
    multiplicacao,
    divisao
}