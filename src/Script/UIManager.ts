import { CardData } from "./models.js";

export class UIManager {
    private cardContainer: HTMLElement;
    private likedCards: Set<string>; // Per memorizzare gli ID delle card piaciute
    private cardsData: CardData[]; // Aggiungiamo un array per i dati delle card
  
    constructor(cardContainerSelector: string, cardsData: CardData[]) {
      const container: HTMLElement | null = document.querySelector(cardContainerSelector);
      if (!container) throw new Error(`Element not found: ${cardContainerSelector}`);
      this.cardContainer = container;
      this.likedCards = new Set(); // Inizializza l'insieme delle card piaciute
      this.cardsData = cardsData; // Passiamo i dati delle card alla classe
    }
  
    renderCards(cardsData: CardData[]): void {
      this.cardContainer.innerHTML = "";
      cardsData.forEach((card) => this.renderCard(card));
    }
  
    renderCard(cardData: CardData): void {
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
            <i title="Like" class="icon ${
              this.likedCards.has(cardId) ? "icon-heart-full" : "icon-heart-outline"
            }"></i>
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
  
    setupCardEventListeners(card: HTMLElement, cardId: string): void {
      const likeIcon = card.querySelector(".icon-heart-outline, .icon-heart-full");
      const removeIcon = card.querySelector(".fa-trash-alt");
  
      likeIcon?.addEventListener("click", () => {
        if (this.likedCards.has(cardId)) {
          this.likedCards.delete(cardId); // Rimuove dai preferiti
          likeIcon.classList.remove("icon-heart-full");
          likeIcon.classList.add("icon-heart-outline");
        } else {
          this.likedCards.add(cardId); // Aggiunge ai preferiti
          likeIcon.classList.remove("icon-heart-outline");
          likeIcon.classList.add("icon-heart-full");
        }
  
        // Se siamo nella vista "Mi piace", rimuovi la card se non è più nei preferiti
        if (document.querySelector(".user-likes")?.textContent?.includes("Mostra tutte le card")) {
          card.remove();
        }
      });
  
      removeIcon?.addEventListener("click", () => {
        this.removeCardFromDataAndDOM(card, cardId);
      });
    }
  
    // Nuovo metodo per rimuovere la card sia dal DOM che dai dati
    removeCardFromDataAndDOM(cardElement: HTMLElement, cardId: string): void {
      const cardIndex = this.cardsData.findIndex(card => `${card.userData.email}-${card.catData.url}` === cardId);
      if (cardIndex !== -1) {
        this.cardsData.splice(cardIndex, 1); // Rimuove la card dai dati
      }
      cardElement.remove(); // Rimuove la card dal DOM
    }
  
    isFavorite(cardData: CardData): boolean {
      const cardId = `${cardData.userData.email}-${cardData.catData.url}`;
      return this.likedCards.has(cardId);
    }

  searchCards(query: string): void {
    const cards = this.cardContainer.querySelectorAll(".cat-card");
    cards.forEach((card) => {
      const cardElement = card as HTMLElement; // Type assertion
      const cardText = cardElement.textContent?.toLowerCase() || "";
      cardElement.style.display = cardText.includes(query) ? "block" : "none";
    });
  }  
}
