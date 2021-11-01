console.time('test 1 ');
const obj1 ={};
console.timeEnd('test 1 ')

console.time('test 3 ');
const arrWitoutPrototype = Object.create(null);
console.timeEnd('test 3 ');

console.time('test 100 ');
let map100 = new Map();
for(let i = 0; i<100;i++){
    map100.set(i,i+1)
}
console.timeEnd('test 100 ');

console.time('test  1k');
let map1k = new Map();
for(let i = 0; i<10000;i++){
    map1k.set(i,i+1)
}
console.timeEnd('test 1k ');

console.time('test 1m ');
let map1m = new Map();
for(let i = 0; i<10000000;i++){
    map1m.set(i,i+1)
}
console.timeEnd('test 1m ');


const obj = { key1: '1', key2: 2 }; 
function objTOmap(obj) {
    return new Map(Object.entries(obj))    
}
console.log(objTOmap(obj));

const testMap = new Map();
testMap.set('key1','val1','key2','val2')
testMap.set('key2','val2')

function mapTOobj(map) {
    return Object.fromEntries(map); 
}
console.log(mapTOobj(testMap));