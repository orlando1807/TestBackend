/*
    EXPLICACIÓN DE PROCESO DE LA SOLUCIÓN Y ALROGITMO (PASOS QUE SE REALIZARON).
    - Primeramente pedimos al usuario que ingrese la cadena que desea operar, 
    usamos libreria readline.
    - Llamamos la funciona calculate que sera la encargada de dar la solución.
    - Comenzamos haciendo un splits sobre la cadena que ingresamos, asi dividir
      cada caracter en una posicion de un arreglo.

    - Hacemos declaración de variables como cont, index, newArrays y sizeOperators (Explicados en su debido momento).

    - Comparamos primeramente si el tamaño del arreglo es mayor que 20 caracteres
      que muestre mensaje y no haga ninguna operación.

    - Si es menor o igual a 20 el tamaño del arreglo de caracteres comenzara
      a realizar un forEach para recorrer cada caracter por caracter preguntando
      si es un numero o si es un operador, en el caso que sea un numero, va a ingresarlo
      en el newArrays declarado en la posicion index es decir 0 cuando comienza,
      se colocó la variable cont que nos servira para saber si se leen dos numeros seguidos
      una vez se lee un numero cont se suma 1, asi si se encuentra un nuevo numero, debemos
      agregar en la posicion anterior de index la logica que multiplique x10 y le sume el nuevo numero,
      por ejemplo: primero numero leido 2, y luego se lee el 5. La lógica nos dira 2 x 10 = 20 +5 = 25
      de esta manera sabremos que el numero que estamos leyendo es 25.
      Si encuentra un operador lo agregara en la posicion actual del index, sumaremos 1 en sizeOperators,
      esta variable nos indicara cuantos operadores hay ingresados.
      Una vez terminado este forEach ya obtendremos en un arreglo con los valores ingresados.
      Por ejemplo: Se ingreso 44-7+8+9/2*3 tendremos un arreglo de la siguiente manera 
      [44,'-','7','+','8','+','9','/','2','*','3',].

    - Posteriormente declaramos hasError como False, esto nos ayudara para saber si hay algun error
      en el nuevo arreglo formado (NewArrays), posibles errores como si colocamos un operador al inicio, final
      e incluso si colocamos dos operadores seguidos contara como error, cualquier de los casos hasError 
      sera True, de esta manera luego comparamos si hasError nos muestre mensaje que hay un error sintactico
      de lo contrario hara la última lógica.

    - Por medio de un ciclo while le decimos que cuando el tamaño de los operadores sea 0 se detenga o en el caso
      que el tamaño de newArrays que fue el nuevo arreglo que se construyo sea 1 se detenga.

    - Por medio de un ciclo for recorremos el arreglo, creamos la primer condicion y usamos indexOf en el arreglo
      para encontrar operador División /  o encontras Multiplicación *  , si encontramos continuara con la lógica 
      caso contrario se saldra del ciclo for para continuar con el próximo ciclo for, en el caso que si encuentre
      consultara si el operador que encontró es División / entonces realizará la division de la posición anterior
      con el de la posición siguiente, luego con el uso de splice sobre el arreglo eliminamos la posición del primero número,
      operador y el segundo número con el que se dividio.
      Luego en la posicion i-1 se crea e inserta usando siempre splice el valor de la división antes realizada,
      reducimos el tamaño de los operadores menos 1 y pasamos el i del ciclo for a 0, para que volvamos a validar
      siempre desde 0 denuevo el arreglo.
      Caso que encuentre el operador Multiplicación * realizará lo mismo solo que multiplicara el número anterior con el 
      número siguiente y luego realizará lo mismo que la División.

    - Una vez ya no encuentre mas operadores de multiplicación ni división terminara el ciclo for e ingresara al ciclo for
      para encontrar sumas y restas.
      De esta manera si encuentre suma o resta la realizará y comenzara hacer el mismo procedimiento de multiplicar y dividir,
      eliminando las 3 posiciones, insertando nueva con el nuevo valor de la suma o resta, reduciendo al tamaño de los operadores
      menos 1, y convirtiendo el i en 0 para que vuelva hacer el ciclo for desde el comienzo, tambien cada ciclo esta consultando
      con indexOf sobre el arreglo si hay operador de suma + o si hay operador resta - , si ya no encuentra se saldra del ciclo for
      para este momento consultara en el ciclo while si el tamaño del arreglo es 0 o si el arreglo tiene tamaño 1, como hemos 
      ido reduciendo el tamaño de los operadores, se espera ya se encuentre en 0 de esta manera se sale, y el arreglo
      newArrays en la posicion 0 se encuentra con el resultado de toda la operación lo cual imprimimos en consola el resultado.

*/

/*
    ** Se puede utilizar numeros de 2,3 o mas digitos. **
    
    PRUEBAS REALIZADAS
    Ingresando                          Resultado
    /8*5+9-5*4                          La cadena contiene errores sintactico
    8*5+9-5*4/                          La cadena contiene errores sintactico
    45/8*5**6+2                         La cadena contiene errores sintactico
    1*5/25+4-5*5*6*8/5-65+21-45         La cadena contiene mas de 20 caracteres
    5+8-9/5*2+2-78*2                    -144.6
    5-789+12*1000-10000                 1216
    5*8*9*6*3*2/5*4/2                   5184
    1000/10/5*10/5*20                   800
    21-21*2/4+100/5                     30.5
    45/5*9-2+45*8-65                    374
*/

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Ingrese cadena a operar: ", function(chain) {
    calculate(chain);
    rl.close();
});
const calculate = (chain)=>{

    let splits = chain.split('');
    let cont = 0;
    let index = 0;
    let newArrays=[];
    let sizeOperators=0;
    if(splits.length>20){
        console.log('La cadena contiene mas de 20 caracteres');
        return;
    }
    splits.forEach((split) => {
        if (isNaN(split)) {
            newArrays[index] = split;
            sizeOperators++;
            cont = 0;
        } else {
            if (cont != 0) {
                index--;
                newArrays[index] = (newArrays[index]*10) +Number(split);
            } else {
                newArrays[index] = Number(split);
            }
            cont++;
        }
        index++;
    });
    let hasError = false;
    for (let i = 0; i < newArrays.length; i++) {
        if(isNaN(newArrays[i])){
            if(!newArrays[i-1] || !newArrays[i+1] ){
                hasError=true;
            }else if(isNaN(newArrays[i-1]) || isNaN(newArrays[i+1])){
                hasError=true;
            }
        }
    }
    if(hasError){
        console.log('La cadena contiene errores sintactico');
        return;
    };
    while(sizeOperators>0 || newArrays.length>1){
        for (let i = 0; i < newArrays.length; i++) {
            if(newArrays.indexOf("/")===-1 && newArrays.indexOf("*")===-1 )break;
            if(newArrays[i]==='/'){
                const value = newArrays[i-1] / newArrays[i+1]; 
                newArrays.splice(i-1,3);
                newArrays.splice(i-1,0,value); 
                sizeOperators--;
                i=0;
            }
            if(newArrays[i]==='*'){
                const value = newArrays[i-1] * newArrays[i+1]; 
                newArrays.splice(i-1,3);
                newArrays.splice(i-1,0,value);
                sizeOperators--;
                i=0;
            }
        }
        for (let i = 0; i < newArrays.length; i++) {
            if(newArrays.indexOf("+")===-1 && newArrays.indexOf("-")===-1 )break;
            if(newArrays[i]==='+'){
                const value = newArrays[i-1] + newArrays[i+1]; 
                newArrays.splice(i-1,3);
                newArrays.splice(i-1,0,value); 
                sizeOperators--;
                i=0;
            }
            if(newArrays[i]==='-'){
                const value = newArrays[i-1] - newArrays[i+1]; 
                newArrays.splice(i-1,3);
                newArrays.splice(i-1,0,value);
                sizeOperators--;
                i=0;
            }
        }
    }
    console.log(newArrays[0]);
    
}