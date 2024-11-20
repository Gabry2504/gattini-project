var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CardService {
    static fetchData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    static fetchInitialData() {
        return __awaiter(this, void 0, void 0, function* () {
            const [catsData, usersData] = yield Promise.all([
                this.fetchData("https://api.thecatapi.com/v1/images/search?limit=10"),
                this.fetchData("https://randomuser.me/api/?results=10"),
            ]);
            if (catsData && usersData) {
                return catsData.map((cat, index) => ({
                    catData: cat,
                    userData: usersData.results[index],
                }));
            }
            return [];
        });
    }
    static fetchSingleCard() {
        return __awaiter(this, void 0, void 0, function* () {
            const [catData, userData] = yield Promise.all([
                this.fetchData("https://api.thecatapi.com/v1/images/search?limit=1"),
                this.fetchData("https://randomuser.me/api/?results=1"),
            ]);
            if (catData && userData) {
                return { catData: catData[0], userData: userData.results[0] };
            }
            return null;
        });
    }
}
//# sourceMappingURL=CardService.js.map