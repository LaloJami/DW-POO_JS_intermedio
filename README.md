# Curso intermedio de programación orientada a objetos

## Static: atributos y métodos estáticos en JavaScript
Hasta ahora habíamos aprendido que para acceder a los métodos o atributos de una clase o prototipo teníamos que crear una instancia del prototipo(Objeto). Sin embargo, existe una forma de que podemos saltarnos el tener que crear una insatancia del prototipo para acceder a los métodos o atributos, esta es la forma ``Static``.

Para crear atributos estáticos los cuales podemos acceder sin crear un objeto o una instancia de este prototipo, solo hay que agregar al atributo la parabra reservada ``static``.

### Métodos estáticos de Objetct
```js
const objetito = {
    name: "Carlitos",
    email: "carlitosmazzaroli@gmail.com",
    age: 16,
}
```
``Object.keys()``
Nos devuelve una lista con todos los keys (nombres claves) de nuestro objeto objetito
```js
Object.keys(objetito)
// (3) ["name", "email", "age"]
```
``Object.getOwnPropertyNames()``
Hace prácticamente lo mismo que ``Object.keys()`` con pequeñas diferencias. [Documentación](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

```js
Object.getOwnPropertyNames(objetito)
// (3) ["name", "email", "age"]
```
``Object.entries()``
El método entries nos devolverá un arrays de arrays donde tendremos nuestra palabra clave con su respectivo valor por cada propiedad del prototipo [key, value].
```js
Object.entries(objetito)
// [
//     0: (2) ["name", "Carlitos"]
//     1: (2) ["email", "carlitosmazzaroli@gmail.com"]
//     2: (2) ["age", 16]
// ]
```
``Object.getOwnPropertyDescriptors(objetito)``
Nos devuelve todas las propieddes de los objetos, con sus keys, values, y otros atributos. Los atributos ``writable``, ``configurable``, y ``enumerable`` es la forma que tiene JavaScript para limitar el acceso, o modificación de nuestros atributos de nuestros objetos.
```js
Object.getOwnPropertyDescriptors(objetito) 
// {
//     age:{
//         configurable: true
//         enumerable: true
//         value: 16
//         writable: true
//     }
//     email:{
//         configurable: true
//         enumerable: true
//         value: "carlitosmazzaroli@gmail.com"
//         writable: true
//     }
//     name:{
//         configurable: true
//         enumerable: true
//         value: "Carlitos"
//     }
// }
``` 
### Encapsulamiento

El objetivo del encapsulamiento era limitiar quien puede modificar, acceder o ejecutar nuestros metodos o atributos de la clase o prototipo.

Ahora con las propiedades ``writable``, ``configurable`` y ``enumerable`` podemos limitar quien tiene acceso, modificar nuestros objetos.

## ``Object.defineProperty()``

El método estático ``Object.defineProperty()`` define una nueva propiedad sobre un objeto, o modifica una ya existente, y devuelve el objeto modificado.

**Sintaxis**

``Object.defineProperty(obj, prop, descriptor)``

**Parámetros**
* ``obj`` El objeto sobre el cual se define la propiedad.

* ``prop`` El nombre de la propiedad a ser definida o modificada.

* ``descriptor`` El descriptor de la propiedad que está siendo definida o modificada

Así mismo, se puede configurar ciertas características de la propiedad tales como:

* **Configurable**: Esta indica si la propiedad puede ser borrada o eliminada
* **Enumerable**: Indica si la propiedad puede ser mostrada en la enumeración de las mismas. Existen ciertos métodos que toman como referencia este valor para mostrar la propiedad
* **Writable**: Esta indica si la propiedad puede ser modificada con el operador de asignación (=)

Si queremos modificar un propiedad que tienen ``writable: false`` no permitirá que su valor sea modificado

``Object.keys`` solo muestra las propiedades que tienen ``enumerable: true``. A diferencia de ``Object.getOwnPropertyNames`` que muestra todas las propiedades

Si queremos eliminar un propiedad que tienen ``configurable: false`` no permitirá que sea borrada del objeto.

``Object.freeze()``

Este método congela un objeto que sea pasado. Es decir:

* Impide que se le agreguen nuevas propiedades
* Impide que sean eliminas propiedades ya existentes
* Impide que sus las propiedades internas (``writable``, ``enumerable`` y ``configurable``) sean modificadas

``Object.seal()``

Este método sella un objeto que sea pasada. Es decir:

* Impide que nuevas propiedades sean agregadas
* Cambia en todas las propiedades a ``configurable: false``, con lo que impide que sean borradas
* Las propiedades aún puede ser modificadas, ya que ``writable`` esta ``true``

## Cómo funciona la memoria en JavaScript
🎳 Las variables son referencias a un espacio en memoria.

🎩 Los navegadores web usan dos tipos de memorias: Stack y Heap.

📁 La memoria **Stack** es muy rápida, pero sin tanto espacio. Aquí se guardan los valores primitivos (booleanos, strings, números…).

🌪 La memoria **Heap** es más lenta, pero permite guardar enormes cantidades de información (son como los tornados: grandes, lentos y desordenados). En esta memoria guardamos los valores de los objetos ({...}).

Entender cómo funciona la memoria en JavaScript no solo será útil para aprender POO, sino también para programación funcional. 😉

> hay que tener cuidado cuando deseas copiar objetos
```js
const juanita = {
    name: "Juanita Flores",
    age: 18,
}
const anita = juanita;
```
cuando creas el objeto ``anita`` y lo modificas
```js
anita.name = "Anita Perez";
anita.age = 24;
```
no parece que haya nada malo, pero cuando llamas al objeto ``juanita``, este cambio sus valores por los de ``anita``.
```js
anita
{name: 'Anita Perez', age: 24}
juanita
{name: 'Anita Perez', age: 24}
```
Esto sucede porque cuando creamos a ``anita``, lo que se hizo fue crear un puntero en ``Stack`` que nos lleva al ``Heap`` donde se encuentra la información del objeto, por ende, ``anita`` seria un puntero al objeto ``juanita``, y no una copia del objeto en si.

¿Entones que debo hacer para copiar un objeto?

**Shallow Copy** se refiere a la forma de crear un nuevo objeto a partir de las propiedades de otro. Esta copia solo se hace a un nivel alto, no se hace con objetos dentro de objetos (nested objects), lo que provoca que la modificación de una de sus propiedades, modifique el objeto principal.
```js
const person = {
	name: 'Eduardo',
	email: 'edudardo@mail.com',
  social: {
    facebook: 'Eduardo Garcia',
    twiiter: 'EduGar'
  }
}

const person2 = {}

for (prop in person) {
  person2[prop] = person[prop]
}

person2.name = 'Eduardo Miguel'
person
/* {
  name: 'Eduardo',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Garcia', twiiter: 'EduGar' }
} */

person2
/* {
  name: 'Eduardo Miguel',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Garcia', twiiter: 'EduGar' }
} */

person2.social.facebook = 'Eduardo Miguel Garcia'
person
/* {
  name: 'Eduardo',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Miguel Garcia', twiiter: 'EduGar' }
} */

person2
/* {
  name: 'Eduardo Miguel',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Miguel Garcia', twiiter: 'EduGar' }
} */
```

Existe un método del objeto ``Object`` que nos permite hacer esta copia directa, con el método ``Object.assign()``. Sin embargo, este método sigue conservando el problema de los objetos internos.

```js
const person = {
	name: 'Eduardo',
	email: 'edudardo@mail.com',
  social: {
    facebook: 'Eduardo Garcia',
    twiiter: 'EduGar'
  }
}

const person2 = Object.assign({}, person)

person2.name = 'Eduardo Miguel'
person
/* {
  name: 'Eduardo',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Garcia', twiiter: 'EduGar' }
} */

person2
/* {
  name: 'Eduardo Miguel',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Garcia', twiiter: 'EduGar' }
} */

person2.social.facebook = 'Eduardo Miguel Garcia'
person
/* {
  name: 'Eduardo',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Miguel Garcia', twiiter: 'EduGar' }
} */

person2
/* {
  name: 'Eduardo Miguel',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Miguel Garcia', twiiter: 'EduGar' }
} */

```
De la misma manera existe otro método que nos permite hacer esta copia, el método ``Object.create()``. A diferencia de los métodos anteriores, este método copia un objeto como el prototipo del nuevo objeto. Sin embargo, sigue conservando el mismo problema de los objetos internos.
```js
const person = {
	name: 'Eduardo',
	email: 'edudardo@mail.com',
  social: {
    facebook: 'Eduardo Garcia',
    twiiter: 'EduGar'
  }
}

const person2 = Object.create(person)

person2.name = 'Eduardo Miguel'
person
/* {
  name: 'Eduardo',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Garcia', twiiter: 'EduGar' }
} */

person2
/* {
  name: 'Eduardo Miguel',
  __proto__: {
    name: 'Eduardo Miguel',
    email: 'edudardo@mail.com',
    social: {
      facebook: 'Eduardo Garcia',
      twiiter: 'EduGar'
    }
  }
} */

person2.social.facebook = 'Eduardo Miguel Garcia'
person
/* {
  name: 'Eduardo',
  email: 'edudardo@mail.com',
  social: { facebook: 'Eduardo Miguel Garcia', twiiter: 'EduGar' }
} */

person2
/* {
  name: 'Eduardo Miguel',
  __proto__: {
    name: 'Eduardo Miguel',
    email: 'edudardo@mail.com',
    social: {
      facebook: 'Eduardo Miguel Garcia',
      twiiter: 'EduGar'
    }
  }
} */
```

¿Entonces cual es la solución?

``JSON.stringify()``
El método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena JSON, reemplazando opcionalmente valores si se especifica una función de reemplazo u opcionalmente incluyendo solo las propiedades especificadas si se especifica una matriz de reemplazo.
* Los objetos Boolean, Number, and String se convierten a sus valores primitivos, de acuerdo con la conversión semántica tradicional.
* Si durante la conversión se encuentra un ``undefined``, una ``Function``, o un ``Symbol`` se omite (cuando se encuentra en un objeto) o se censura a ``null`` (cuando se encuentra en un array). ``JSON.stringify()`` puede devolver undefined cuando se pasan valores “puros” como ``JSON.stringify(function(){})`` o ``JSON.stringify(undefined)``.
* Todas las propiedades que utilicen Symbol en los nombres de la clave se ignoran por completo, incluso si utilizan una función ``replacer``.
* Las instancias de Date implementan la función ``toJSON()`` devolviendo una cadena de texto (igual que ``date.toISOString()``). Por lo que son tratadas como strings.
* Los números ``Infinity`` y ``NaN``, así como el valor null, se consideran null.
* El resto de instancias de ``Object`` (incluyendo ``Map``, ``Set``, ``WeakMap``, y ``WeakSet``) sólo tendrán serializadas sus propiedades enumerables.

``JSON.stringify ()`` convierte un valor en notación JSON que lo representa:

``JSON.parse()``

El método JSON.parse() analiza una cadena de texto (string) como JSON, transformando opcionalmente el valor producido por el análisis.

* Puedes perder tipos de datos.
* JavaScript no te avisara cuando pierdas algún tipo de dato al usar JSON.stringify(), asi que GG mi rey
* Convierte tipos de datos no soportados en soportados, como ``infinity`` y ``NaN`` en null
* Los tipos de datos ``Date`` serán parseados como ``strings``, no como ``Date``
* No es tan rápido y eficiente.

[Why JSON.parse(JSON.stringify()) is a bad practice to clone an object in JavaScript](https://medium.com/@pmzubar/why-json-parse-json-stringify-is-a-bad-practice-to-clone-an-object-in-javascript-b28ac5e36521)

Entonces con esto puedo copiar objetos pero no sus metodos, Entonces ¿cual es la forma correcta de clonar un objeto?!
La respuesta es la ***Recursividad***

La **recursividad** es cuando una funcion se llama a si misma.

**¿Por qué escribir programas recursivos?**
* Son mas cercanos a la descripción matemática.
* Generalmente mas fáciles de analizar
* Se adaptan mejor a las estructuras de datos recursivas.
* Los algoritmos recursivos ofrecen soluciones estructuradas, modulares y elegantemente simples.

**Factible de utilizar recursividad**
* Para simplificar el código.
* Cuando la estructura de datos es recursiva
ejemplo : árboles.

**No factible utilizar recursividad**
* Cuando los métodos usen arreglos largos.
* Cuando el método cambia de manera impredecible de campos.
* Cuando las iteraciones sean la mejor opción.

## Duck typing
es la forma de progamar donde identificamos a nuestros elementos dependiendo de los métodos y atributos que tengan por dentro.

lectures recomender
* https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
* https://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript
* https://igorluczko.medium.com/the-new-keyword-in-javascript-f448b932eea8
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

## Atributos y métodos privados en prototipos