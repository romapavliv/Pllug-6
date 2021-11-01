window.addEventListener('DOMContentLoaded', () => {
    'use strict';
const animals = document.querySelector('#animals'),
      cat = document.querySelector('#cat'),
      pet = document.querySelectorAll('.pet');

function fonSize(cls) { 
    cls.style.fontSize = '30px';
}
fonSize(animals);

function delLastCls(cls) {  
    cls.lastElementChild.classList ='';
}
delLastCls(animals);

function color(cls) { 
    cls.nextElementSibling.style.color ='red';    
}
color(cat);

// function DelElmByClass(cls) {
//     while(cls.length > 0){
//         cls[0].parentNode.removeChild(cls[0]);
//     }
// }
// delLastCls(pet)






console.log(pet);


// console.log(animals);

})