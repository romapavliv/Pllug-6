window.addEventListener('DOMContentLoaded', () => {
'use strict';

    const inputText = document.getElementById('inputText'),
            addBtn = document.getElementById('add'),
            delBtn = document.getElementById('del'),
            clearBtn = document.getElementById('clear'),
            textList = document.querySelector('.textList'),
            messageArea = document.getElementById('warning'),
            counter = document.querySelector('.coutner'),
            message ={
                error: "Input don't be empty",
                limit: 'Queue is full'
            }
            
    let allText;
    let yearLength = new Date().getFullYear() - 1987; 

    function stateManager() {
        return addToHtml(), setLocal(), count(), inputText.focus();
    }

    !localStorage.getItem('textItem') ? allText = [] : allText = JSON.parse(localStorage.getItem('textItem'));

    count();

    function TextItem(text) {
        this.text = text    
    }

    function textTemplate(typed, index) {
        return  `<li class="textItem">${index})  ${typed.text}</li>`;  
    }

    function addToHtml() {
        textList.innerHTML ='';
        if (allText.length> 0 ){
            allText.forEach((item, index) => textList.innerHTML += textTemplate(item,index+1));
        }        
    }
    addToHtml();

    function setLocal() {
        localStorage.setItem('textItem', JSON.stringify(allText))
    }

    function count() {
        return counter.innerHTML = `${allText.length} / ${yearLength}`
    }

    function clear() {
        allText.splice(0, allText.length);
        messageArea.innerHTML='';
        inputText.value= '';    
    }

    function delFirst() {
        allText.splice(0,1);
        messageArea.innerHTML='';   
    }

    addBtn.addEventListener('submit', (event) => {
        event.preventDefault();
        if (inputText.value.replace(/\s/g, '').length <= 0 ){
            messageArea.innerHTML = message.error;
            inputText.focus();
        }
        else if (allText.length >= yearLength){
            messageArea.innerHTML = message.limit;
            inputText.focus();  
        }
        else {
            allText.push(new TextItem(inputText.value));
            stateManager();
            messageArea.innerHTML = '';
            inputText.value= ''; 
        }
    })

    clearBtn.addEventListener('click',() => {
        clear();
        stateManager();
        localStorage.clear();   
    })

    delBtn.addEventListener('click', ()=> {
        setTimeout(() => {
            delFirst();
            stateManager();
        },500)
    })
   
})