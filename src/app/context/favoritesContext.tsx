"use client";

import useLocalStorage from "../hooks/useLocalStorage";
import { useContext, createContext } from "react";

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (pair: string) => void;
  removeFavorite: (pair: string) => void;
  toggleFavorite: (pair: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const addFavorite = (pair: string) => {
    setFavorites((prev) => (prev.includes(pair) ? prev : [...prev, pair]));
  };

  const removeFavorite = (pair: string) => {
    setFavorites((prev) => prev.filter((p) => p !== pair));
  };

  const toggleFavorite = (pair: string) => {
    setFavorites((prev) =>
      prev.includes(pair) ? prev.filter((p) => p !== pair) : [...prev, pair],
    );
  };

  return (
    <FavoritesContext
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
