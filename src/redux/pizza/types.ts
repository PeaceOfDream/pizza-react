export interface SearchPizzaParams {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
}

export interface Pizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  type: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}