import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
  items: [], 
  totalPrice: 0 
}; 

const getPizzaPrice = (obj) => { 
  if (typeof obj.price === 'number') { 
    return obj.price; 
  } 
  if (obj.prices && obj.size) { 
    return Number(obj.prices[obj.size] || 0); 
  } 
  return 0; 
}; 

const cartSlice = createSlice({ 
  name: 'cart', 
  initialState, 
  reducers: { 
    setItems(state, action) { 
      state.items = action.payload; 
      state.totalPrice = state.items.reduce((sum, obj) => { 
        return sum + getPizzaPrice(obj); 
      }, 0); 
    }, 
    addItem(state, action) { 
      state.items.push(action.payload); 
      state.totalPrice = state.items.reduce((sum, obj) => { 
        return sum + getPizzaPrice(obj); 
      }, 0); 
    }, 
    // ДОБАВИЛИ: Метод для удаления одной пиццы при нажатии на минус
    minusItem(state, action) {
      // Ищем индекс элемента с нужным id
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        // Удаляем строго один этот элемент из массива
        state.items.splice(index, 1);
      }
      // Пересчитываем общую стоимость
      state.totalPrice = state.items.reduce((sum, obj) => { 
        return sum + getPizzaPrice(obj); 
      }, 0); 
    },
    clearItems(state) { 
      state.items = []; 
      state.totalPrice = 0; 
    } 
  } 
}); 

// Не забываем экспортировать новый экшен minusItem
export const { addItem, minusItem, clearItems, setItems } = cartSlice.actions; 
export default cartSlice.reducer;
// В самый низ файла store.ts
