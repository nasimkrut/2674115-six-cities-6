import { UserData } from './user-data';

export type ReviewType = {
  id: string;
  date: string;
  user: UserData;
  comment: string;
  rating: number;
};
