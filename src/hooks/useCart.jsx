import React, { useState } from 'react';
import axios from 'axios'; // Не забудьте импорт axios
import { useEffect } from 'react';
import { setItems } from '../store/slices/createSlice';
import { addItem } from '../store/slices/createSlice';
import { useDispatch } from 'react-redux';
const API_URL = 'https://e5925c51acc6c42b.mokky.dev/cartItems';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const dispatch=useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(API_URL);
       dispatch(setItems(data))
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchData();
  }, []);
  const onAddToCard = async (obj) => {
    try {
      const { data } = await axios.post(API_URL, obj);
      setCartItems((prev) => [...prev, data]);
      dispatch(addItem(data))
    } catch (error) {
      alert('Ошибка при добавлении: ' + error.message);
    }
  };

  // Возвращаем переменные, чтобы их можно было использовать в компонентах
  return { setCartItems, cartItems, onAddToCard };
}
