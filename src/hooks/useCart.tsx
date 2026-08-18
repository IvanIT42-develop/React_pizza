import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setItems, addItem } from '../store/slices/createSlice';
import { Pizza } from '../App'; // Путь к вашему интерфейсу Pizza

const API_URL = 'https://e5925c51acc6c42b.mokky.dev/cartItems';

// 1. Создаем тип для элемента корзины, который приходит с сервера
export interface CartItemFromServer extends Pizza {
  size: number;
}

export function useCart() {
  // 2. Явно указываем дженерик <CartItemFromServer[]> для useState
  const [cartItems, setCartItems] = useState<CartItemFromServer[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 3. Указываем тип для ответа axios.get
        const { data } = await axios.get<CartItemFromServer[]>(API_URL);
        dispatch(setItems(data));
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // 4. Типизируем аргумент obj (здесь это пицца без id, так как id создаст сервер)
  const onAddToCard = async (obj: Omit<CartItemFromServer, 'id'>) => {
    try {
      // 5. Указываем тип для ответа axios.post
      const { data } = await axios.post<CartItemFromServer>(API_URL, obj);
      setCartItems((prev) => [...prev, data]);
      dispatch(addItem(data));
    } catch (error) {
      alert('Ошибка при добавлении: ' + error);
    }
  };

  return { setCartItems, cartItems, onAddToCard };
}
