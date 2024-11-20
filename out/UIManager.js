export class UIManager {
    constructor(cardContainerSelector, cardsData) {
        const container = document.querySelector(cardContainerSelector);
        if (!container)
            throw new Error(`Element not found: ${cardContainerSelector}`);
        this.cardContainer = container;
        this.likedCards = new Set(); // Inizializza l'insieme delle card piaciute
        this.cardsData = cardsData; // Passiamo i dati delle card alla classe
    }
    renderCards(cardsData) {
        this.cardContainer.innerHTML = "";
        cardsData.forEach((card) => this.renderCard(card));
    }
    renderCard(cardData) {
        const { catData, userData } = cardData;
        const card = document.createElement("div");
        card.className = "cat-card";
        const cardId = `${userData.email}-${catData.url}`; // Un ID unico per ogni card
        const time = Math.floor(Math.random() * 24) + 10;
        card.innerHTML = `
        <figure style="background-image:url('${catData.url}');">
          <img class="avatar" src="${catData.url}" alt="Cat Image" />
          <div class="spinner"></div>
        </figure>
        <div class="card-info">
          <h2>
            ${userData.name.title} ${userData.name.last} ${userData.name.first}
            <i title="Like" class="icon ${this.likedCards.has(cardId) ? "icon-heart-full" : "icon-heart-outline"}"></i>
          </h2>
          <p class="description">Email: ${userData.email}</p>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices erat nec metus fermentum gravida.
          </div>
          <p class="extra">
            since: ${userData.registered.date.substring(0, 4)} - 
            ${userData.gender} - 
            age: ${userData.registered.age}
            <i title="Trash" class="icon fas fa-trash-alt"></i>
          </p>
          <div class="status">
            <span>${time}h ago</span>
            <div>
              <img class="avatar a3" src="../../assets/img/Avatar-2.png" alt="User Avatar 3" />
              <img class="avatar a2" src="../../assets/img/Avatar-1.png" alt="User Avatar 2" />
              <img class="avatar a1" src="${userData.picture.thumbnail}" alt="User Avatar 1" />
            </div>
          </div>
        </div>
      `;
        this.cardContainer.appendChild(card);
        this.setupCardEventListeners(card, cardId);
    }
    setupCardEventListeners(card, cardId) {
        const likeIcon = card.querySelector(".icon-heart-outline, .icon-heart-full");
        const removeIcon = card.querySelector(".fa-trash-alt");
        likeIcon === null || likeIcon === void 0 ? void 0 : likeIcon.addEventListener("click", () => {
            var _a, _b;
            if (this.likedCards.has(cardId)) {
                this.likedCards.delete(cardId); // Rimuove dai preferiti
                likeIcon.classList.remove("icon-heart-full");
                likeIcon.classList.add("icon-heart-outline");
            }
            else {
                this.likedCards.add(cardId); // Aggiunge ai preferiti
                likeIcon.classList.remove("icon-heart-outline");
                likeIcon.classList.add("icon-heart-full");
            }
            // Se siamo nella vista "Mi piace", rimuovi la card se non è più nei preferiti
            if ((_b = (_a = document.querySelector(".user-likes")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.includes("Mostra tutte le card")) {
                card.remove();
            }
        });
        removeIcon === null || removeIcon === void 0 ? void 0 : removeIcon.addEventListener("click", () => {
            this.removeCardFromDataAndDOM(card, cardId);
        });
    }
    // Nuovo metodo per rimuovere la card sia dal DOM che dai dati
    removeCardFromDataAndDOM(cardElement, cardId) {
        const cardIndex = this.cardsData.findIndex(card => `${card.userData.email}-${card.catData.url}` === cardId);
        if (cardIndex !== -1) {
            this.cardsData.splice(cardIndex, 1); // Rimuove la card dai dati
        }
        cardElement.remove(); // Rimuove la card dal DOM
    }
    isFavorite(cardData) {
        const cardId = `${cardData.userData.email}-${cardData.catData.url}`;
        return this.likedCards.has(cardId);
    }
    searchCards(query) {
        const cards = this.cardContainer.querySelectorAll(".cat-card");
        cards.forEach((card) => {
            var _a;
            const cardElement = card; // Type assertion
            const cardText = ((_a = cardElement.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
            cardElement.style.display = cardText.includes(query) ? "block" : "none";
        });
    }
}
//# sourceMappingURL=UIManager.js.map