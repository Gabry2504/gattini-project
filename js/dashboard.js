const cardContainer = document.querySelector(".cards-container");
let showOnlyFavorites = false;
let cardsData = [];
// Funzione per caricare le 10 card iniziali
async function fetchInitialData() {
  showLoadingScreen();
  try {
    const [catsData, usersData] = await Promise.all([
      fetchData("https://api.thecatapi.com/v1/images/search?limit=10"),
      fetchData("https://randomuser.me/api/?results=10"),
    ]);
    if (catsData && usersData) {
      cardsData = catsData.map((cat, index) => ({
        catData: cat,
        userData: usersData.results[index],
      }));
      renderCards();
    } else {
      console.error("Errore durante il caricamento dei dati iniziali.");
    }
  } catch (error) {
    console.error("Errore durante il fetch iniziale dei dati:", error);
  } finally {
    hideLoadingScreen();
  }
}
// Funzione per aggiungere una nuova card
async function addSingleCard() {
  showLoadingScreen();
  try {
    const [catData, userData] = await Promise.all([
      fetchData("https://api.thecatapi.com/v1/images/search?limit=1"),
      fetchData("https://randomuser.me/api/?results=1"),
    ]);
    if (catData && userData) {
      const newCard = { catData: catData[0], userData: userData.results[0] };
      cardsData.push(newCard);
      renderCard(newCard); // Renderizza solo la nuova card
    } else {
      console.error("Errore durante il caricamento dei dati per una nuova card.");
    }
  } catch (error) {
    console.error("Errore durante il fetch per aggiungere una singola card:", error);
  } finally {
    hideLoadingScreen();
  }
}
// Funzione per eseguire il fetch generico
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Errore nella richiesta a ${url}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Errore nel recupero dei dati da ${url}:`, error);
    return null;
  }
}
// Funzione per renderizzare tutte le card presenti in `cardsData`
function renderCards() {
  cardContainer.innerHTML = "";
  cardsData.forEach((card) => renderCard(card));
}
// Funzione per creare e renderizzare una singola card
function renderCard({ catData, userData }) {
  const card = document.createElement("div");
  card.className = "cat-card";
  let time = Math.floor(Math.random() * 24) + 10;
  card.innerHTML = `
    <figure style="background-image:url('${catData.url}');">
      <img class="avatar" src="${catData.url}" alt="Cat Image" />
      <div class="spinner"></div>
    </figure>
    <div class="card-info">
        <h2>
            ${userData.name.title}                         
            ${userData.name.last}
            ${userData.name.first}
            <i title="Like" class="icon icon-heart-outline"></i>
        </h2>
        <p class="description">Email: ${userData.email}</p>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices erat nec metus fermentum gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices erat nec metus fermentum gravida.
        </div>
        <p class="extra">
          since: ${userData.registered.date.substring(0, 4)}
          - 
          ${userData.gender}
          - 
          age: ${userData.registered.age}
          <i title="Trash" class="icon fas fa-trash-alt"></i>
        </p>
        <div class="status">
            <span>${time}h ago</span>
            <div>
              <img class="avatar a3" src="assets/img/Avatar-2.png" alt="User Avatar 3" />
              <img class="avatar a2" src="assets/img/Avatar-1.png" alt="User Avatar 2" />
              <img class="avatar a1" src="${userData.picture.thumbnail}" alt="User Avatar 1" />
            </div>
        </div>
    </div>
  `;
  cardContainer.appendChild(card);
  setupCardEventListeners(card);
}
// Funzione per impostare i listener di eventi per like e rimozione
function setupCardEventListeners(card) {
  const likeIcon = card.querySelector(".icon.icon-heart-outline");
  likeIcon.addEventListener("click", () => {
    likeIcon.classList.toggle("icon-heart-outline");
    likeIcon.classList.toggle("icon-heart-full");
  });
  const removeIcon = card.querySelector(".fa-trash-alt");
  removeIcon.addEventListener("click", () => {
    removeCardFromDataAndDOM(card);
  });
}
// Funzione per rimuovere una card dal DOM e dall'array
function removeCardFromDataAndDOM(cardElement) {
  const cardIndex = Array.from(cardContainer.children).indexOf(cardElement);
  if (cardIndex !== -1) cardsData.splice(cardIndex, 1);
  cardElement.remove();
}
// Aggiungi una nuova card al clic del pulsante
document.querySelector(".icon-add").addEventListener("click", async () => {
  const addButton = document.querySelector(".icon-add");
  addButton.disabled = true;
  await addSingleCard();
  setTimeout(() => { addButton.disabled = false; }, 1000);
});
// Carica le 10 card iniziali al caricamento della pagina
fetchInitialData();
// Funzione per alternare tra vista preferiti e tutte le card
function filterLikedCards() {
  showOnlyFavorites = !showOnlyFavorites;
  const cards = document.querySelectorAll(".cat-card");
    cards.forEach(card => {
    const heartIcon = card.querySelector(".icon-heart-full");
    // Mostra solo le card con il cuore pieno se `showOnlyFavorites` è vero
    card.style.display = showOnlyFavorites && !heartIcon ? "none" : "block";
  });  
  // Modifica il testo del pulsante per indicare l'attuale modalità di visualizzazione
  const loveButton = document.querySelector(".user-likes");
  loveButton.textContent = showOnlyFavorites ? "Mostra tutte le card" : "Mostra preferiti";
}
// Evento per alternare vista preferiti e tutte le card
document.querySelector(".user-likes").addEventListener("click", filterLikedCards);
// Funzione per mostrare la schermata di caricamento
function showLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = "<p>Loading...</p>";
  document.body.appendChild(loadingScreen);
}
// Funzione per nascondere la schermata di caricamento
function hideLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingOverlay = document.querySelector(".loading-overlay");
  const loadingSpinner = document.querySelector(".loading-spinner");
  if (loadingScreen) {
    loadingScreen.remove();
  }
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
  if (loadingOverlay) {
    loadingOverlay.remove();
  }
}
// Funzione per alternare la visibilità del box di ricerca
function toggleSearchBox() {
  const searchBox = document.querySelector(".search-box");
  searchBox.style.display = searchBox.style.display === "none" ? "flex" : "none";
  if (searchBox.style.display === "flex") {
    document.querySelector(".search-input").focus(); // Imposta il focus sul campo di input
  }
}
// Funzione per eseguire la ricerca
function searchCards() {
  const searchInput = document.querySelector(".search-input").value.toLowerCase();
  const cards = document.querySelectorAll(".cat-card");
  cards.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    card.style.display = cardText.includes(searchInput) ? "block" : "none";
  });
}
// Event listener per la lente di ingrandimento per aprire/chiudere il box di ricerca
document.querySelector(".icon-search").addEventListener("click", (event) => {
  event.stopPropagation(); // Impedisce che il clic sulla lente chiuda subito il box
  toggleSearchBox();
});
// Event listener per il pulsante della ricerca all'interno del box
document.querySelector(".search-button").addEventListener("click", searchCards);
// Chiude il box di ricerca quando si clicca fuori
document.addEventListener("click", (event) => {
  const searchBox = document.querySelector(".search-box");
  const searchIcon = document.querySelector(".icon-search");
  if (searchBox.style.display === "flex" && !searchBox.contains(event.target) && !searchIcon.contains(event.target)) {
    searchBox.style.display = "none"; // Nasconde il box di ricerca
    searchIcon.classList.remove("active"); // Rimuove la classe attiva dalla lente, se presente
  }
});