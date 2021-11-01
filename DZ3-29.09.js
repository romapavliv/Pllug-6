const emptyObj = {};
const arrWitoutPrototype = Object.create(null);

emptyObj.name = 'Rostyk';
const last = 'lastName';
emptyObj[last] = 'Bakun';

const emptyArr = [];
emptyArr[100499]= '';
console.log(emptyArr.length);

const emptyArr2 = Array.from({length:100500}, () => ' ');
/////////////
let arrNum = new Array(1,2,3,4,5,6,7,8,9);
arrNum.length = 0;//1
while(arrNum.length > 0) {//2
    arrNum.pop();
}
arrNum.splice(0, arrNum.length);//3
/////////////

let arrForFunc = [1,2,3,4,5];

function arrDelFunc(arr, index) {
    let del = arr.indexOf(index)
    return arr.splice(del,1)
}
arrDelFunc(arrForFunc, -1);
console.log(arrForFunc);
////////////

const testArr = [];
function arrCheck(arr) {
    return arr.length === 0;
}
console.log('Array is Empty - ',arrCheck(testArr));
///////////////////////

const testObj = {};
function objCheck(obj) {
    return Object.keys(obj).length === 0;
}
console.log('Object is Empty',objCheck(testObj));
////////////////////////

const a = [1,2,3];
const b = [4,5,6];

function concatArr(arr1, arr2) {
    // return [].concat(arr1, arr2); //1
    return[...arr1, ...arr2];//2
}
console.log(concatArr(a,b));
/////////////

let arrForPow = [1,2,3];
function pow(arr,pow) { 
    return arr.map((item)=> Math.pow(item,pow));
}
console.log(pow(arrForPow,3));
///////////////

const numAll = [1,2,3,4,5,6,7,8,9];
function findOdd(arr) {
    return arr.filter( item=> item % 2 !== 0);  
}
console.log(findOdd(numAll));
////////////////////

let nums = [5, 3.14, 4.1, 10, 11, 20.1];
function isInt(arr) {
    let result=[];
    arr.map((item)=> {
        if(Number.isInteger(item)){
            result.push(item);
        }
    })    
    return result
}
console.log(isInt(nums));
////////

const empty = function() {
    return    
}
console.log(empty());