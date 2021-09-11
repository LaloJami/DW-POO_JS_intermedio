const obj1 = {
    a: "a",
    b: "b",
    c: {
        d: "d",
        e: "e",
    },
    editA(){
        this.a = "AAAA";
    }
}

function isObject(subject) {
    return typeof subject == "object";
}
function isArray(subject) {
    return Array.isArray(subject);
}
// Funcion deepCopy recibe un elemento(puede ser un String, Array, numero, etc)
function deepCopy(subject) {
    //definimos una copia de nuestro elemento que es la que retornaremos
    let copySubject;
    //Vamos a validar si subject es un objeto o un array
    const subjectIsArray = isArray(subject);
    const subjectIsObject = isObject(subject);
    if (subjectIsArray) {
        //Si es un array copySubject sera una lista vacia
        copySubject = []
    } else if (subjectIsObject) {
        //Si es un object copySubject sera un objeto vacio
        copySubject = {}
    } else {
        //Si no es ni un objeto ni un array lo devolveremos tal cual
        return subject;
    }
    //vamos a ejecutar nuestro codigo por cada uno de los elementos de las propiedades que haya dentro de nuestro elemento subject
    for (key in subject){
        //Validamos si la propiedad dentro del elemento es un objeto
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject){
            //si lo es, se llama a la funcion deepCopy
            copySubject[key] = deepCopy(subject[key]);
        } else {
            //Si no es un objeto se hace otra validacion
            if(subjectIsArray){
                //si es un array, le haremos un push
                copySubject.push(subject[key]);
            } else {
                //si no es un array le asignaremos ese mismo valor
                copySubject[key] = subject[key];
            }
        }
    }
    //retornamos la copia
    return copySubject;
}