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