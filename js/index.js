//Regex per contorllo caratteri speciali
const specialCharRegex = /[!@#$%^&*()_+\-=[\]{}|;':",.<>?/]/;
//Richiamo degli ID dello user
const userInput = document.getElementById('userInput');
const userError = document.getElementById('userError');
//Richiamo degli ID della password
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
//Variabili formatto box
const input = document.querySelector('.form-box input:focus');
//Variabile di controllo
let isValid = true;

document
    .getElementById('loginForm')
    .addEventListener('submit', function (event) {
        event.preventDefault(); //Previene il comportamento del submit

        //Validazione del codice di verifica
        const rememberMe = document.querySelector('#rememberMe');

        const objectToSend = {
            username: userInput.value,
            password: passwordInput.value,
            rememberMe: rememberMe.checked,
        };

        //Se tutti i campi sono validi invia il form
        if (isValid) {
            this.submit(); // effettua il submit se tutt è valido
        }
    });

userInput.addEventListener('change', (e) => {
    if (userInput.value) validateUser();
});

passwordInput.addEventListener('change', (e) => {
    if (passwordInput.value) validatePassword();
});

//funzioni
function validateUser() {
    if (
        !userInput.value ||
        userInput.value.toString().length > 20 ||
        !userInput.value.includes('gattini')
    ) {
        userError.style.display = 'block';
        isValid = false;
    } else {
        userError.style.display = 'none';
        isValid = true;
    }
}
function validatePassoword() {
    if (
        !passwordInput.value ||
        passwordInput.value.length < 8 ||
        passwordInput.value.length > 20 ||
        !specialCharRegex.test(passwordInput.value)
    ) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
        isValid = true;
    }
}
