// Variabili con ID
const numberInput = document.getElementById("numberInput");
const numberError = document.getElementById("numberError");
const codeInput = document.getElementById("codeInput");
const codeError = document.getElementById("codeError");
const getCode = document.getElementById("getCode");
const codeError2 = document.getElementById("codeError2");
const generatedCode = document.getElementById("generatedCode");
//Variabili di controllo
let isValid = true;
let code;
let countdownInterval;
let codeExpirationTime;

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //Previene il comportamento del submit

    const objectToSend = {
      number: numberInput.value,
      verificationCode: codeInput.value,
    };
    // Resetta lo stato di validazione
    isValid = true;

    // Effettua le validazioni
    const isNumberValid = validateNumber();
    const isCodeValid = validateCode();

    if (isNumberValid && isCodeValid) {
      this.submit(); // Effettua il submit se tutto è valido
    }
  });

numberInput.addEventListener("change", (e) => {
  if (numberInput.value) validateNumber();
});
codeInput.addEventListener("change", (e) => {
  if (codeInput.value) validateCode();
});
codeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Previene l'invio del form o l'attivazione di sendCode
        codeInput.blur(); // Rimuove il focus dal campo codice
    }
});
getCode.addEventListener("click", (e) => {
  sendCode();
});

// Funzioni
function validateNumber() {
  const isNumber = /^\d{10}$/;
  if (!isNumber.test(numberInput.value)) {
    numberError.style.display = "block";
    numberInput.classList.add("withError");
    return false;
  } else {
    numberError.style.display = "none";
    numberInput.classList.remove("withError");
    return true;
  }
}

function validateCode() {
  if (!codeInput.value || codeInput.value != code) {
    codeError.style.display = "block";
    codeInput.classList.add("withError");
    if (currentTime > codeExpirationTime) {
      codeError.textContent = "The code has expired. Please request a new one.";
    } else {
      codeError.textContent = "The code is incorrect or expired";
    }
    return false;
  } else {
    codeError.style.display = "none";
    codeInput.classList.remove("withError");
    return true;
  }
}

function sendCode() {
  if (validateNumber()) {
    code = Math.floor(Math.random() * 90000) + 10000;

    // Visualizza il codice temporaneo per test
    alert(`Generated code: ${code}`);
    generatedCode.textContent = `Generated code: ${code}`;
    generatedCode.style.display = "block";

    // Imposta il timer di scadenza a 30 secondi
    codeExpirationTime = new Date().getTime() + 30000;

    startCountdown(); // Avvia il countdown di 30 secondi

    codeError2.style.display = "none";
    codeError.style.display = "none";
  } else {
    codeError2.style.display = "block";
  }
}

// Funzione di countdown visuale
function startCountdown() {
  let remainingTime = 30;

  clearInterval(countdownInterval); // Resetta il timer se già avviato

  codeCountdown.style.display = "block"; // Mostra il countdown
  countdownInterval = setInterval(() => {
    codeCountdown.textContent = `Code expires in ${remainingTime} seconds`;
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(countdownInterval);
      codeCountdown.textContent = "Code expired. Please request a new one.";
      code = null; // Resetta il codice
      codeExpirationTime = 0;
      generatedCode.style.display = "none"; // Nascondi il codice generato dopo la scadenza
    }
  }, 1000);
}
