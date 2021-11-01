const number = [1,2,3]
function alphabetnum(num) {
   num = num.map((item)=> String.fromCharCode(item+64).toLowerCase())
    return num
}
console.log(alphabetnum(number))
/////////////////////

const abc = ['FgG','abc','GTR',['zxc'], [1,2,3,-100],{name:'Rost'},' ' ];

function trash(arr) {
    arr = arr.flat();
    let result =[];
     for( let i = 0; i < arr.length; i++){
         if(typeof arr[i] === 'string'){
             result.push(arr[i])
         }
     }
        let str = result.map((item) => item.toLowerCase());
        str = str.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

        return [str.join('').trim()]

    }
console.log(trash(abc));
/////////////////////

const obj = {a: 22, b: -11.35, c: 41.2, d: 'hello'};

function plus(obj) {
    const keyVal = Object.entries(obj);
    const filtered = keyVal.filter(([key, value]) => value >= 0);
    // console.log(filtered);
    const newObj = Object.fromEntries(filtered);
         
        return newObj
}
console.log(plus(obj));




