var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CardService } from "./CardService.js";
import { UIManager } from "./UIManager.js";
export class LoadingScreenManager {
    static hideLoadingScreen() {
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
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const cardsData = yield CardService.fetchInitialData();
        const uiManager = new UIManager(".cards-container", cardsData);
        // Renderizza tutte le card iniziali
        uiManager.renderCards(cardsData);
        // Gestione dell'aggiunta di una nuova card
        (_a = document.querySelector(".icon-add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const newCard = yield CardService.fetchSingleCard();
            if (newCard) {
                cardsData.unshift(newCard);
                uiManager.renderCard(newCard);
                uiManager.renderCards(cardsData);
                scrollTo(10, 10);
            }
        }));
        // Nascondi la schermata di caricamento, se necessaria
        LoadingScreenManager.hideLoadingScreen();
        // Gestione della visualizzazione preferiti
        let showOnlyFavorites = false;
        (_b = document.querySelectorAll(".user-likes")) === null || _b === void 0 ? void 0 : _b.forEach((n) => n.addEventListener("click", () => {
            showOnlyFavorites = !showOnlyFavorites;
            // Filtra le card preferite o mostra tutte
            const updatedCards = showOnlyFavorites
                ? cardsData.filter((card) => uiManager.isFavorite(card))
                : cardsData;
            uiManager.renderCards(updatedCards);
            const loveButton = document.querySelector(".user-likes");
            const loveButtonIcon = document.querySelector(".user-likes i");
            const addButton = document.querySelector(".icon-add");
            if (loveButton && showOnlyFavorites) {
                loveButtonIcon.classList.add("icon-heart-full");
                loveButtonIcon.classList.remove("icon-heart-outline");
                addButton.style.visibility = "hidden";
            }
            else {
                loveButtonIcon.classList.remove("icon-heart-full");
                loveButtonIcon.classList.add("icon-heart-outline");
                addButton.style.visibility = "visible";
            }
        }));
        const menuVoices = document.querySelectorAll(".voice");
        if (menuVoices) {
            menuVoices.forEach((menuVoice, index) => {
                menuVoice.addEventListener("click", (e) => {
                    var _a;
                    (_a = menuVoice.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("expanded");
                });
            });
        }
        // Gestione della ricerca
        (_c = document.querySelector(".icon-search")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            var _a;
            const searchBox = document.querySelector(".search-box");
            searchBox.style.display = searchBox.style.display === "none" ? "flex" : "none";
            (_a = document.querySelector(".search-input")) === null || _a === void 0 ? void 0 : _a.focus();
        });
        (_d = document.querySelector(".search-button")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            const searchInput = document.querySelector(".search-input").value.toLowerCase();
            uiManager.searchCards(searchInput);
        });
        document.addEventListener("click", (event) => {
            const searchBox = document.querySelector(".search-box");
            const searchIcon = document.querySelector(".icon-search");
            if (searchBox.style.display === "flex" &&
                !searchBox.contains(event.target) &&
                !searchIcon.contains(event.target)) {
                searchBox.style.display = "none";
            }
        });
    });
})();
//# sourceMappingURL=main.js.map