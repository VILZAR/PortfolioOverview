import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./cryptoSlice";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    cryptos: cryptoSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
