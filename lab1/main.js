const Juan = {
    name: "Juanito",
    age: 18,
    approvedCourses: ["Curso 1"],
    addCourse(newCourse){
        this.approvedCourses.push(newCourse)
    }
}

// console.log(Object.keys(Juan));
// console.log(Object.getOwnPropertyNames(Juan));
// console.log(Object.entries(Juan));



// Object.defineProperty(carlos, "pruebaNasa", {
//     value: "extraterrestres",
//     writable: true,
//     enumerable: true,
//     configurable: true
// })

// No permite editar, ni borrar, ni visualizar la propiedad usando la funcion keys()
// Object.defineProperty(Juan, "pruebaNasa",{
//     value: "Extraterestres",
//     writable: false,
//     enumerable: false,
//     configurable: false
// })
// // no se puede visualizar usando la funcion keys()
// Object.defineProperty(Juan, "navigator",{
//     value: "Chrome",
//     writable: true,
//     enumerable: false,
//     configurable: true
// })
// //No podemos editarla, pero si podemos eliminarla
// Object.defineProperty(Juan, "editor",{
//     value: "VSCode",
//     writable: false,
//     enumerable: true,
//     configurable: true
// })
// //podemos editarla, pero no podemos eliminarla
// Object.defineProperty(Juan, "terminal",{
//     value: "WSL",
//     writable: true,
//     enumerable: true,
//     configurable: false
// })

//hace que todos los configurable sean false,
// Hace que las propiedades no se puedan borrar
Object.seal(Juan) ;
//Hace que todas mis propiedades no se puedan borrar ni sobreescribirla.
Object.freeze(Juan);
console.log(Object.getOwnPropertyDescriptors(Juan));