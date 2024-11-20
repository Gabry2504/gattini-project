import { CardData, CatData, UserData } from "./models.js";

export class CardService {
  static async fetchData<T>(url: string): Promise<T | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async fetchInitialData(): Promise<CardData[]> {
    const [catsData, usersData] = await Promise.all([
      this.fetchData<CatData[]>("https://api.thecatapi.com/v1/images/search?limit=10"),
      this.fetchData<{ results: UserData[] }>("https://randomuser.me/api/?results=10"),
    ]);

    if (catsData && usersData) {
      return catsData.map((cat, index) => ({
        catData: cat,
        userData: usersData.results[index],
      }));
    }
    return [];
  }

  static async fetchSingleCard(): Promise<CardData | null> {
    const [catData, userData] = await Promise.all([
      this.fetchData<CatData[]>("https://api.thecatapi.com/v1/images/search?limit=1"),
      this.fetchData<{ results: UserData[] }>("https://randomuser.me/api/?results=1"),
    ]);

    if (catData && userData) {
      return { catData: catData[0], userData: userData.results[0] };
    }
    return null;
  }
}
