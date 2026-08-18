import { configureStore } from '@reduxjs/toolkit';

import cart from "./slices/createSlice"

export const store = configureStore({
  reducer: {
    // Теперь Redux будет знать, что за состояние корзины 
    // отвечает именно этот редюсер
    cart: cart, 
  },
});
export type RootState = ReturnType<typeof store.getState>;
