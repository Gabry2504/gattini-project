// Variabili con ID
const numberInput: HTMLInputElement | null = document.getElementById("numberInput") as HTMLInputElement;
const numberError: HTMLElement | null = document.getElementById("numberError");
const codeInput: HTMLInputElement | null = document.getElementById("codeInput") as HTMLInputElement;
const codeError: HTMLElement | null = document.getElementById("codeError");
const getCode: HTMLElement | null = document.getElementById("getCode");
const codeError2: HTMLElement | null = document.getElementById("codeError2");
const generatedCode: HTMLElement | null = document.getElementById("generatedCode");
const codeCountdown: HTMLElement | null = document.getElementById("codeCountdown");

// Variabili di controllo
let isValidRegister: boolean = true;
let code: string | null = null;
let countdownInterval: number | null = null;
let codeExpirationTime: number = 0;

const registerForm: HTMLFormElement | null = document.getElementById("registerForm") as HTMLFormElement;

if (registerForm) {
    registerForm.addEventListener('submit', function (event: Event) {
        event.preventDefault(); // Previene il comportamento del submit

        const objectToSend = {
            number: numberInput?.value || '',
            verificationCode: codeInput?.value || '',
        };

        // Resetta lo stato di validazione
        isValidRegister = true;

        // Effettua le validazioni
        const isNumberValid: boolean = validateNumber();
        const isCodeValid: boolean = validateCode();

        if (isNumberValid && isCodeValid) {
            registerForm.submit(); // Effettua il submit se tutto è valido
        }
    });
}

// Event listener per validazione
numberInput?.addEventListener('change', () => {
    if (numberInput.value) validateNumber();
});

codeInput?.addEventListener('change', () => {
    if (codeInput.value) validateCode();
});

codeInput?.addEventListener('keypress', function (event: KeyboardEvent) {
    if (event.key === "Enter") {
        event.preventDefault(); // Previene l'invio del form o l'attivazione di sendCode
        codeInput.blur(); // Rimuove il focus dal campo codice
    }
});

getCode?.addEventListener("click", () => {
    sendCode();
});

// Funzioni
function validateNumber(): boolean {
    const isNumber: RegExp = /^\d{10}$/;
    if (!numberInput?.value || !isNumber.test(numberInput.value)) {
        if (numberError) {
            numberError.style.display = "block";
        }
        numberInput?.classList.add("withError");
        return false;
    } else {
        if (numberError) {
            numberError.style.display = "none";
        }
        numberInput?.classList.remove("withError");
        return true;
    }
}

function validateCode(): boolean {
    const currentTime = new Date().getTime();

    if (!codeInput?.value || codeInput.value !== code || currentTime > codeExpirationTime) {
        if (codeError) {
            codeError.style.display = "block";
            codeInput?.classList.add("withError");

            codeError.textContent =
                currentTime > codeExpirationTime
                    ? "The code has expired. Please request a new one."
                    : "The code is incorrect or expired";
        }
        return false;
    } else {
        if (codeError) {
            codeError.style.display = "none";
        }
        codeInput?.classList.remove("withError");
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
    } else {
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
