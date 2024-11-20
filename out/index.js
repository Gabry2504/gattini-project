import { CardService } from "./CardService.js";
// Regex per controllo caratteri speciali
const specialCharRegex = /[!@#$%^&*()_+\-=[\]{}|;':",.<>?/]/;
// Richiamo degli ID dello user
const userInput = document.getElementById('userInput');
const userError = document.getElementById('userError');
// Richiamo degli ID della password
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
// Variabili formato box
const input = document.querySelector('.form-box input:focus');
// Variabile di controllo
let isValidLogin = true;
// Gestione del submit del form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene il comportamento del submit
        const rememberMe = document.querySelector('#rememberMe');
        const objectToSend = {
            username: (userInput === null || userInput === void 0 ? void 0 : userInput.value) || '',
            password: (passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) || '',
            rememberMe: (rememberMe === null || rememberMe === void 0 ? void 0 : rememberMe.checked) || false,
        };
        // Se tutti i campi sono validi invia il form
        if (isValidLogin) {
            CardService.fetchInitialData().then((res) => {
                localStorage.setItem('user', userInput.value);
                localStorage.setItem('imgProfile', res[0].userData.picture.thumbnail);
                loginForm.submit(); // Effettua il submit se tutto è valido
            }).catch(() => {
                localStorage.setItem('imgProfile', '../../assets/img/avatar-head.png');
                localStorage.setItem('user', 'Serati Ma');
            });
        }
    });
}
// Validazione in tempo reale
userInput === null || userInput === void 0 ? void 0 : userInput.addEventListener('change', () => {
    if (userInput.value)
        validateUser();
});
passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.addEventListener('change', () => {
    if (passwordInput.value)
        validatePassword();
});
// Funzioni di validazione
function validateUser() {
    if (!(userInput === null || userInput === void 0 ? void 0 : userInput.value) ||
        userInput.value.toString().length > 20 ||
        !userInput.value.includes('gattini')) {
        if (userError)
            userError.style.display = 'block';
        isValidLogin = false;
    }
    else {
        if (userError)
            userError.style.display = 'none';
        isValidLogin = true;
    }
}
function validatePassword() {
    if (!(passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) ||
        passwordInput.value.length < 8 ||
        passwordInput.value.length > 20 ||
        !specialCharRegex.test(passwordInput.value)) {
        if (passwordError)
            passwordError.style.display = 'block';
        isValidLogin = false;
    }
    else {
        if (passwordError)
            passwordError.style.display = 'none';
        isValidLogin = true;
    }
}
//# sourceMappingURL=index.js.map