import { CardService } from "./CardService.js";
import { UIManager } from "./UIManager.js";
import { CardData } from "./models.js";

export class LoadingScreenManager {
    static hideLoadingScreen(): void {
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
}

(async function () {
    const cardsData: CardData[] = await CardService.fetchInitialData();
    const uiManager = new UIManager(".cards-container", cardsData);

    // Renderizza tutte le card iniziali
    uiManager.renderCards(cardsData);

    // Gestione dell'aggiunta di una nuova card
    document.querySelector(".icon-add")?.addEventListener("click", async () => {
        const newCard = await CardService.fetchSingleCard();
        if (newCard) {
            cardsData.push(newCard);
            uiManager.renderCard(newCard);
        }
    });

    // Nascondi la schermata di caricamento, se necessaria
    LoadingScreenManager.hideLoadingScreen();

    // Gestione della visualizzazione preferiti
    let showOnlyFavorites: boolean = false;
    document.querySelectorAll(".user-likes")?.forEach((n)=>n.addEventListener("click", () => {
        showOnlyFavorites = !showOnlyFavorites;

        // Filtra le card preferite o mostra tutte
        const updatedCards = showOnlyFavorites
            ? cardsData.filter((card) => uiManager.isFavorite(card))
            : cardsData;

        uiManager.renderCards(updatedCards);

        // Aggiorna il testo del pulsante "Mostra preferiti"
        const loveButton = document.querySelector(".user-likes") as HTMLElement;
        loveButton.textContent = showOnlyFavorites
            ? "Mostra tutte le card"
            : "Mostra preferiti";
    }));
    const menuVoices: NodeListOf<HTMLImageElement> | null = document.querySelectorAll(".voice") as NodeListOf<HTMLImageElement>;

    if (menuVoices) {
        menuVoices.forEach((menuVoice, index) => {
            menuVoice.addEventListener("click", (e: Event) => {
                menuVoice.parentElement?.classList.toggle("expanded");
            })
        });
    }

    // Gestione della ricerca
    document.querySelector(".icon-search")?.addEventListener("click", () => {
        const searchBox = document.querySelector(".search-box") as HTMLElement;
        searchBox.style.display = searchBox.style.display === "none" ? "flex" : "none";
        (document.querySelector(".search-input") as HTMLInputElement)?.focus();
    });

    document.querySelector(".search-button")?.addEventListener("click", () => {
        const searchInput = (document.querySelector(".search-input") as HTMLInputElement).value.toLowerCase();
        uiManager.searchCards(searchInput);
    });

    document.addEventListener("click", (event) => {
        const searchBox = document.querySelector(".search-box") as HTMLElement;
        const searchIcon = document.querySelector(".icon-search") as HTMLElement;
        if (
            searchBox.style.display === "flex" &&
            !searchBox.contains(event.target as Node) &&
            !searchIcon.contains(event.target as Node)
        ) {
            searchBox.style.display = "none";
        }
    });
})();
