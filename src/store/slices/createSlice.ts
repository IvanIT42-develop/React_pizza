import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 1. Метод для загрузки данных с сервера (Mokky) при старте
        setItems(state, action) {
            state.items = action.payload;
            state.totalPrice = state.items.reduce((sum, obj) => {
                return Number(obj.price) + sum;
            }, 0);
        },

        addItem(state, action) {
            // Добавляем новый товар
            state.items.push(action.payload);
            
            // Пересчитываем общую стоимость
            state.totalPrice = state.items.reduce((sum, obj) => {
                return Number(obj.price) + sum;
            }, 0);
        },

        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

// Добавляем setItems в экспорт
export const { addItem, clearItems, setItems } = cartSlice.actions;
export default cartSlice.reducer;
