import { CardService } from "./CardService.js";
import { CardData } from "./models.js";

// Regex per controllo caratteri speciali
const specialCharRegex: RegExp = /[!@#$%^&*()_+\-=[\]{}|;':",.<>?/]/;

// Richiamo degli ID dello user
const userInput: HTMLInputElement | null = document.getElementById('userInput') as HTMLInputElement;
const userError: HTMLElement | null = document.getElementById('userError');

// Richiamo degli ID della password
const passwordInput: HTMLInputElement | null = document.getElementById('passwordInput') as HTMLInputElement;
const passwordError: HTMLElement | null = document.getElementById('passwordError');

// Variabili formato box
const input: HTMLInputElement | null = document.querySelector('.form-box input:focus');

// Variabile di controllo
let isValidLogin: boolean = true;

// Gestione del submit del form
const loginForm: HTMLFormElement | null = document.getElementById('loginForm') as HTMLFormElement;



if (loginForm) {
    loginForm.addEventListener('submit', function (event: Event) {
        event.preventDefault(); // Previene il comportamento del submit

        const rememberMe = document.querySelector('#rememberMe') as HTMLInputElement;

        const objectToSend = {
            username: userInput?.value || '',
            password: passwordInput?.value || '',
            rememberMe: rememberMe?.checked || false,
        };      

        // Se tutti i campi sono validi invia il form
        if (isValidLogin) {
            CardService.fetchInitialData().then((res: CardData[]) => {            
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
userInput?.addEventListener('change', () => {
    if (userInput.value) validateUser();
});

passwordInput?.addEventListener('change', () => {
    if (passwordInput.value) validatePassword();
});

// Funzioni di validazione
function validateUser(): void {
    if (
        !userInput?.value ||
        userInput.value.toString().length > 20 ||
        !userInput.value.includes('gattini')
    ) {
        if (userError) userError.style.display = 'block';
        isValidLogin = false;
    } else {
        if (userError) userError.style.display = 'none';
        isValidLogin = true;
    }
}

function validatePassword(): void {
    if (
        !passwordInput?.value ||
        passwordInput.value.length < 8 ||
        passwordInput.value.length > 20 ||
        !specialCharRegex.test(passwordInput.value)
    ) {
        if (passwordError) passwordError.style.display = 'block';
        isValidLogin = false;
    } else {
        if (passwordError) passwordError.style.display = 'none';
        isValidLogin = true;
    }
}
