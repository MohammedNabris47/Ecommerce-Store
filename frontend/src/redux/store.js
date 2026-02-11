import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorite/favoriteSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import cartReducer from "./features/cart/cartSlice";
import shopReducer from "./features/shop/shopSlice";
const initialFavorites = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    shop: shopReducer,
  },

  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
