import { Location } from './location';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: Location;
  rating: number;
  description: string;
  images: string[];
  bedrooms: number;
  goods: Goods;
  maxAdults: number;
  host: Host;
  isPremium?: boolean;
  isFavorite?: boolean;
  previewImage?: string;
};

type Goods = string[];

type Host = {
    name: string;
    avatarUrl: string;
    isPro?: boolean;
};
