export interface Offer {
  pictures: Array<string>,
  previewImage: string,
  title: string,
  description: Array<string>,
  premium: boolean,
  favourite: boolean,
  type: string,
  rating: number,
  bedrooms: number,
  guests: number,
  cost: number,
  conveniences: Array<string>,
  coordinates: Array<number>,
  owner: {
    avatar: string,
    name: string,
    pro: boolean,
    id: number,
    },
  id: number,
};

export interface CityCoordinates {
  coordinates: Array<number>,
  zoom: number,
}

export interface CityOffers {
  city: string,
  cityCoordinates: CityCoordinates,
  offers: Array<Offer>,
}

export enum AuthorizationStatus {
  AUTH = `AUTH`,
  NO_AUTH =`NO_AUTH`,
}

export interface Classes {
  card: string,
  wrapper: string,
  cards?: string,
  map?: string,
  info?: string,
}

export interface Review {
  comment: string,
  date: string,
  rating: number,
  id: number,
  user: {
    avatar: string,
    name: string,
    isPro: boolean,
    userId: number,
  }
}


export enum Sorting {
  DEFAULT = `popular`,
  TO_HIGHT = `to-high`,
  TO_LAW = `to-low`,
  TOP_RATED = `top-rated`,
}
