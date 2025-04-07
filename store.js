import { atom } from "jotai";

// FAVOURITES ATOM
export const favouritesAtom = atom([]);

export const showAddedAtom = atom((get) => {
  // This atom will compute whether the item is already in the favourites list
  return get(favouritesAtom).includes(objectID);
});

// SEARCH HISTORY ATOM
export const searchHistoryAtom = atom([]);
