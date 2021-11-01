const str = 'HellO woRlD!';

function reverseCase(str) {
    let result = "";
    for (let i of str) {
        let letter = i;
        result += (letter === letter.toLowerCase())?
        letter.toUpperCase():
        letter.toLowerCase()
    }
    return result
}
console.log(reverseCase(str));

function crash1(){
    let i = 1;
    let a ;
    while (i > 0){
            a = i++;
            console.log(a); 
    }
}
crash1();

function crach2(x) {
    if (x >= 100000000)
    return;
    crach2(x + 1);
}

crach2(0);
