import alerta from './notifications.js';

window.onload = () => {

    // VARIÁVEIS GLOBAIS -------------------------------------------

    const display = document.querySelector('#display');
    const keys = document.querySelectorAll('.key');
    var history = new Array;
    var equation = new String;
    var enter_x_pressed = 0;

    // MAPEAR TECLAS -----------------------------------------------
    
    function mapKeys(){
        keys.forEach(e => {
            e.addEventListener("click", k => {
    
                let key_value = k.target.dataset.value;
                let key_text = k.target.dataset.text;
                
                if(k.target.classList.contains("special-key"))
                {
                    switch(key_value)
                    {
                        case "Backspace":
                            backspace();
                            break;
                        case "Delete":
                            clean();
                            break;
                        case "Enter":
                            calculate(equation)
                            break;
                    }

                } else {
                    drawDisplay(key_text);
                    equation += key_value;
                }
            })
        })
    }
    mapKeys();

    // FUNÇÕES DO TECLADO ------------------------------------------

    function listenKeyboard()
    {
        document.addEventListener("keydown", (k) => {
            for(let i = 0; i < keys.length; i ++)
            {
                if(k.key === keys[i].dataset.value)
                {
                    keys[i].click();
                    keys[i].classList.add('enabled');
                    break;
                }
            }
            if(k.key === ',') 
            {
                document.querySelector('button[data-value="."]').click();
                document.querySelector('button[data-value="."]').classList.add('enabled');
            }
        });
        document.addEventListener("keyup", (k) => {
            for(let i = 0; i < keys.length; i ++)
            {
                if(k.key === keys[i].dataset.value)
                {
                    keys[i].classList.remove('enabled');
                    break;
                }
            }
            if(k.key === ',')
            {
                document.querySelector('button[data-value="."]').classList.remove('enabled');
            }
        });
    }
    listenKeyboard();

    // VERIFICAR SE A TELA ESTÁ VAZIA ------------------------------

    function displayIsEmpty()
    {
        let display_span = document.querySelector('#display-span');
        (display.innerText !== '')?
            display_span.style.display = "none":
            display_span.style.display = "inline-flex";
    }

    // REMOVER O PRIMEIRO ZERO --------------------------------------

    function removeFirstZero()
    {
        if(display.innerText[0] === '0' && display.innerText.length > 1 && display.innerText[1] !== '.')
        {
            display.innerText = display.innerText.slice(1);
            equation = equation.slice(1);
        }
    }

    // FUNÇÃO PARA MOSTRAR EQUAÇÕES NA TELA DA CALCULADORA ---------

    function drawDisplay(element)
    {
        display.innerText += element;
        displayIsEmpty();
        removeFirstZero();
        display.title = display.innerText;
    }

    // FUNÇÃO PARA LIMPAR A CALCULADORA ----------------------------

    function clean()
    {
        display.innerText = '';
        equation = '';
        displayIsEmpty();
    }
    
    // BACKSPACE ---------------------------------------------------

    function backspace()
    {
        equation = equation.slice(0, -1);
        display.innerText = display.innerText.slice(0, -1);
        displayIsEmpty();
    }

    // CALCULAR ----------------------------------------------------

    function calculate(eq) {
        
        (eval(eq) === undefined)? equation = '' : equation = `${eval(eq)}`;
        display.innerText = equation;
        
        history[enter_x_pressed] = equation;
        enter_x_pressed++;
        
        verifyHistory();
    }

    // *FUNÇÃO EXTRA* VER SE O ENTER FOI PRECIONADO DUAS VEZES SEGUIDAS,
    // SE SIM O DISPLAY É LIMPO

    function verifyHistory() {
        if(enter_x_pressed > 1){
            enter_x_pressed = 0;
            if(history[1] === history[0])
            {
                clean();
            }
        }
    }
}