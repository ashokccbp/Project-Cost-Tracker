export interface Item {
  id: string;
  name: string;
  cost: number;
  createdAt: Date;
}

export interface OtherCost {
  id: string;
  description: string;
  amount: number;
  createdAt: Date;
}

export interface Project {
  items: Item[];
  otherCosts: OtherCost[];
}

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface ItemsState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

export interface OtherCostsState {
  otherCosts: OtherCost[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  items: ItemsState;
  otherCosts: OtherCostsState;
}