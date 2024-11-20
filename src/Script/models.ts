export interface CatData {
    url: string;
}

export interface UserData {
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    gender: string;
    registered: {
        date: string;
        age: number;
    };
    picture: {
        thumbnail: string;
    };
}

export interface CardData {
    catData: CatData;
    userData: UserData;
}
