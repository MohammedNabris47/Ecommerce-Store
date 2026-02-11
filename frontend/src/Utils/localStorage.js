export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter((p) => p._id !== productId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const getFavoritesFromLocalStorage = () => {
  const favoriteJson = localStorage.getItem("favorites");
  return favoriteJson ? JSON.parse(favoriteJson) : [];
};
