const obj1 = {
    a: "a",
    b: "b",
    c: {
        d: "d",
        e: "e",
    }
}
//Shallow copy
// const obj2 = {};

// for (prop in obj1) {
//     obj2[prop] = obj1[prop];
// }

// const obj3 = Object.assign({}, obj1);
// const obj4 = Object.create(obj1);

//JSON.parse y JSON.stringify

const stringifiedComplexObj = JSON.stringify(obj1);
const obj2 = JSON.parse(stringifiedComplexObj);

// function recursiva(){
//     if (){

//     }else{

//     }
// }
// let numerito = 0;
const numeritos = [0,1,2,3,4,5,67,7,9,8,75,1,3]
// for (let index = 0; index < numeritos.length; index++) {
//     numerito = numeritos[index];
//     console.log({index, numerito})
    
// }

function recursiva(numberArray) {
    if (numberArray.length != 0) {
        const firstNum = numberArray[0];
        console.log(firstNum);
        numberArray.shift();
        recursiva(numberArray);
    }
}

