import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SavedRecipesContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedRecipesContext = createContext<SavedRecipesContextType>({
  savedIds: [],
  toggleSave: () => {},
  isSaved: () => false,
});

export const SavedRecipesProvider = ({ children }: { children: ReactNode }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("saved-recipes") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("saved-recipes", JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <SavedRecipesContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useSavedRecipes = () => useContext(SavedRecipesContext);
