import React, { useState } from 'react';
import axios from 'axios'; // Не забудьте импорт axios
import { useEffect } from 'react';
const API_URL = 'https://e5925c51acc6c42b.mokky.dev/cartItems';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://e5925c51acc6c42b.mokky.dev/cartItems');

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
    } catch (error) {
      alert('Ошибка при добавлении: ' + error.message);
    }
  };

  // Возвращаем переменные, чтобы их можно было использовать в компонентах
  return { cartItems, onAddToCard };
}
