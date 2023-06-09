////D0 NOT DEPLOY THE API_KEY
const API_KEY = 'sk-fOiY26cKnfoVfOTtc1EjT3BadslbkFJpcQbvszxxcz8tHCx04tisOtgFO';

const submitButton = document.querySelector("#submit");
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('#input');
const historyElement = document.querySelector('#history');
const buttonElement = document.querySelector('#button');


function changeInput(value) {
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}

async function getMessage(){
    console.log("clicked");

    if (!inputElement) {
        console.error("Input element is undefined");
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 500
          })
    }
   
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        outputElement.textContent = data.choices[0].message.content;
        console.log(data.choices);

        if (data.choices[0].text && inputElement.value) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput());
            historyElement.append(pElement);
        }
    } catch (error) {
        console.log(error);
    }
}


submitButton.addEventListener("click", getMessage)

// function clearInput () {
//     inputElement.value = ''
// }

// buttonElement.addEventListener('click', clearInput)