import { createContext } from 'react';
import { Pizza } from './App';
import { images } from './App';
interface AppsContext {
  pizzas: Pizza[];
  isLoading: boolean;
  imageMap: images;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setPizzas: (value: Pizza[]) => void;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  sortType: string;
  setSortType: (value: string) => void;
}
interface HomesContext {
  priceSort: () => void;
  alphabet: () => void;
  ratingSort: () => void;
}
export const AppContext = createContext<AppsContext>({} as AppsContext);
export const HomeContext = createContext<HomesContext>({} as HomesContext);
