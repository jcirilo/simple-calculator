window.onload = () => {
    const operator_key_length = document.getElementsByClassName("key-operator").length;
    const number_key_length = document.getElementsByClassName("key-number").length;
    var counter;
    const display = document.getElementById("display");
    var equation = '';
    var beep1= new Audio(`./public/assets/sounds/beep-07a-numbers.mp3`);
    var beep2 = new Audio(`./public/assets/sounds/beep-08a-operators.mp3`);
    var keys = new Array;

    // MAPPING ALL BUTTONS ---------------------------------------------------------------------------------------------
    // Numbers

    for(counter = 0; counter < number_key_length; counter++)
    {
        keys[counter] = document.querySelector(`#n${counter}`);
        keys[counter].addEventListener("click", (element) => {

            playSound(beep1);

            var element_value = element.target.value;
            var element_text = element.target.innerHTML;

            drawDisplay(element_text);
            equation += element_value;

        });
    }

    // Special keys

    for(counter = 0; counter < operator_key_length; counter++)
    {
        keys[counter+number_key_length] = document.querySelector(`#operator${counter}`);
        keys[counter+number_key_length].addEventListener("click", (element) => {

            var element_value = element.target.value;
            var element_text = element.target.innerHTML;

            console.log(element_value);
            console.log(element_text);

            drawDisplay(element_text);
            equation += element_value;

            if(element_value == "equals")
            {
                
                playSound(beep2);
                
                equation = equation.slice(0, -6);

                try{
                    drawResult(calc(equation));
                }catch(error){
                    drawResult('ERROR!');
                    equation = '';
                }
            }
            else
            {
                playSound(beep1);
            }

            if(element_value == "backspace")
            {
                backspace();
            }

            if(element_value == "clear"){
                clearDisplay();
            }
        });
    }

    // FUNCTION TO SHOW THE INPUT ON DISPLAY -------------------------------------------------------------------------
    
    function drawDisplay(element) 
    {
        display.value += element;
    }

    // FUNCTION TO CALCULATE -----------------------------------------------------------------------------------------

    function calc(value)
    {
        equation = eval(value);
        
        if(equation % 1 === 0)
        {
            return parseInt(equation);
        }
        else
        {
            return equation.toFixed(3);
        }

    }

    // FUNCTION TO SHOW THE OUTPUT ON DISPLAY -------------------------------------------------------------------------

    function drawResult(element)
    {
        if(equation === 0 || equation === 'undefined')
        {
            clearDisplay();
        }
        else
        {
            display.value = element;
        }
    }

    // FUNCTION TO CLEAR THE DISPLAY -----------------------------------------------------------------------------------

    function clearDisplay ()
    {
        equation = '';
        display.value = null;
    }

    // BACKSPACE FUNCTION -----------------------------------------------------------------------------------------------

    function backspace()
    {
        equation = equation.slice(0, -10);
        display.value = display.value.slice(0, -1);
    }

    function playSound(sound)
    {
        sound.volume = 0.01;
        sound.pause();
        sound.currentTime = 0.0;
        sound.play();
    }
}