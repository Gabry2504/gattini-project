"use strict";
// Variabili con ID
const numberInput = document.getElementById("numberInput");
const numberError = document.getElementById("numberError");
const codeInput = document.getElementById("codeInput");
const codeError = document.getElementById("codeError");
const getCode = document.getElementById("getCode");
const codeError2 = document.getElementById("codeError2");
const generatedCode = document.getElementById("generatedCode");
const codeCountdown = document.getElementById("codeCountdown");
// Variabili di controllo
let isValidRegister = true;
let code = null;
let countdownInterval = null;
let codeExpirationTime = 0;
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene il comportamento del submit
        const objectToSend = {
            number: (numberInput === null || numberInput === void 0 ? void 0 : numberInput.value) || '',
            verificationCode: (codeInput === null || codeInput === void 0 ? void 0 : codeInput.value) || '',
        };
        // Resetta lo stato di validazione
        isValidRegister = true;
        // Effettua le validazioni
        const isNumberValid = validateNumber();
        const isCodeValid = validateCode();
        if (isNumberValid && isCodeValid) {
            registerForm.submit(); // Effettua il submit se tutto è valido
        }
    });
}
// Event listener per validazione
numberInput === null || numberInput === void 0 ? void 0 : numberInput.addEventListener('change', () => {
    if (numberInput.value)
        validateNumber();
});
codeInput === null || codeInput === void 0 ? void 0 : codeInput.addEventListener('change', () => {
    if (codeInput.value)
        validateCode();
});
codeInput === null || codeInput === void 0 ? void 0 : codeInput.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Previene l'invio del form o l'attivazione di sendCode
        codeInput.blur(); // Rimuove il focus dal campo codice
    }
});
getCode === null || getCode === void 0 ? void 0 : getCode.addEventListener("click", () => {
    sendCode();
});
// Funzioni
function validateNumber() {
    const isNumber = /^\d{10}$/;
    if (!(numberInput === null || numberInput === void 0 ? void 0 : numberInput.value) || !isNumber.test(numberInput.value)) {
        if (numberError) {
            numberError.style.display = "block";
        }
        numberInput === null || numberInput === void 0 ? void 0 : numberInput.classList.add("withError");
        return false;
    }
    else {
        if (numberError) {
            numberError.style.display = "none";
        }
        numberInput === null || numberInput === void 0 ? void 0 : numberInput.classList.remove("withError");
        return true;
    }
}
function validateCode() {
    const currentTime = new Date().getTime();
    if (!(codeInput === null || codeInput === void 0 ? void 0 : codeInput.value) || codeInput.value !== code || currentTime > codeExpirationTime) {
        if (codeError) {
            codeError.style.display = "block";
            codeInput === null || codeInput === void 0 ? void 0 : codeInput.classList.add("withError");
            codeError.textContent =
                currentTime > codeExpirationTime
                    ? "The code has expired. Please request a new one."
                    : "The code is incorrect or expired";
        }
        return false;
    }
    else {
        if (codeError) {
            codeError.style.display = "none";
        }
        codeInput === null || codeInput === void 0 ? void 0 : codeInput.classList.remove("withError");
        return true;
    }
}
function sendCode() {
    if (validateNumber()) {
        code = (Math.floor(Math.random() * 90000) + 10000).toString();
        // Visualizza il codice temporaneo per test
        alert(`Generated code: ${code}`);
        if (generatedCode) {
            generatedCode.textContent = `Generated code: ${code}`;
            generatedCode.style.display = "block";
        }
        // Imposta il timer di scadenza a 30 secondi
        codeExpirationTime = new Date().getTime() + 30000;
        startCountdown(); // Avvia il countdown di 30 secondi
        if (codeError2) {
            codeError2.style.display = "none";
        }
        if (codeError) {
            codeError.style.display = "none";
        }
    }
    else {
        if (codeError2) {
            codeError2.style.display = "block";
        }
    }
}
// Funzione di countdown visuale
function startCountdown() {
    let remainingTime = 30;
    if (countdownInterval !== null) {
        clearInterval(countdownInterval); // Resetta il timer se già avviato
    }
    if (codeCountdown) {
        codeCountdown.style.display = "block"; // Mostra il countdown
    }
    countdownInterval = window.setInterval(() => {
        if (codeCountdown) {
            codeCountdown.textContent = `Code expires in ${remainingTime} seconds`;
        }
        remainingTime--;
        if (remainingTime < 0) {
            if (countdownInterval !== null) {
                clearInterval(countdownInterval);
            }
            if (codeCountdown) {
                codeCountdown.textContent = "Code expired. Please request a new one.";
            }
            code = null; // Resetta il codice
            codeExpirationTime = 0;
            if (generatedCode) {
                generatedCode.style.display = "none"; // Nascondi il codice generato dopo la scadenza
            }
        }
    }, 1000);
}
//# sourceMappingURL=signup.js.map