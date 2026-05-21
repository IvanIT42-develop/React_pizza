import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './Cart.module.css';
import StartPageBtn from '../../components/startPageBtn/startPageBtn';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addItem } from '../../store/slices/createSlice';
import { useState } from 'react';
import { minusItem } from '../../store/slices/createSlice';
import leftpath from '../../assets/img/leftpath.png';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  // 1. Группируем товары перед отрисовкой
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(
      (target) => target.title === item.title && target.size === item.size,
    );
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`https://e5925c51acc6c42b.mokky.dev/cartItems/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Ошибка при удалении');
    }
  };

  const handleMinus = async (obj) => {
    if (obj.count === 1) {
      await deleteCartItem(obj.id);
      dispatch(minusItem(itemToDelete.id));
    } else {
      const itemToDelete = cartItems.find(
        (item) => item.title === obj.title && item.size === obj.size,
      );
      if (itemToDelete) {
        await deleteCartItem(itemToDelete.id);
        dispatch(minusItem(itemToDelete.id));
      }
    }
  };

  const handlePlus = async (obj) => {
    if (isUpdating) return;
    try {
      setIsUpdating(true);
      const { id, count, ...newItem } = obj;
      const { data } = await axios.post('https://e5925c51acc6c42b.mokky.dev/cartItems', newItem);
      dispatch(addItem(data));
      setCartItems((prev) => [...prev, data]);
    } catch (error) {
      alert('Не удалось добавить товар');
    } finally {
      setIsUpdating(false);
    }
  };

  const del = async (obj) => {
    const itemsToDelete = cartItems.filter(
      (item) => item.title === obj.title && item.size === obj.size,
    );
    try {
      await Promise.all(
        itemsToDelete.map((item) => {
          return axios.delete(`https://e5925c51acc6c42b.mokky.dev/cartItems/${item.id}`);
        }),
      );
      setCartItems((prev) =>
        prev.filter((item) => !(item.title === obj.title && item.size === obj.size)),
      );
    } catch (error) {
      alert('Не удалось удалить товар из корзины');
    } finally {
      setIsUpdating(false);
    }
  };

  // УДАЛИЛИ КРИВОЙ КУСОК С ПЕРЕМЕННОЙ pizzaCount

  return (
    <div className={styles.cartWrapper}>
      <h2 className={styles.title}>Корзина</h2>
      {groupedItems.length > 0 ? (
        <div className={styles.itemsList}>
          {groupedItems.map((obj) => (
            <div key={obj.id} className={styles.cartItem}>
              <img className={styles.itemImg} width={70} src={obj.imageUrl} alt={obj.title} />
              <div className={styles.itemInfo}>
                <p>
                  {obj.title} ({obj.size} см)
                </p>{' '}
                {/* Добавили вывод размера в название */}
                <b>{(obj.prices?.[obj.size] || 0) * obj.count} руб.</b>
              </div>
              <div className={styles?.countControl || styles.countControl}>
                <button onClick={() => handleMinus(obj)}> - </button>
                {/* ИСПРАВЛЕНО: Теперь выводим количество конкретной пиццы из obj.count */}
                <span className={styles.countBadge}>{obj.count} шт.</span>
                <button disabled={isUpdating} onClick={() => handlePlus(obj)}>
                  +
                </button>
              </div>
            </div>
          ))}
          {/* НИЖНИЙ БЛОК: Статистика и кнопки действий */}
          <div className={styles.cartBottom}>
            {/* Ряд с количеством и итоговой суммой */}
           
            <div className={styles.cartBottomDetails}>
              <span>
                Всего пицц: <b>{items.length} шт.</b>
              </span>
              <span>
                Сумма заказа: <b className={styles.totalPrice}>{totalPrice} ₽</b>
              </span>
            </div>

            {/* Ряд с кнопками возврата и оплаты */}
            <div className={styles.cartBottomButtons}>
              <Link to="/">
              <button className={styles.backBtn}><img src={leftpath} className={styles.leftpath}/> Вернуться назад</button>
              </Link>

              <button className={styles.checkoutBtn}>Оплатить сейчас</button>
            </div>
          </div>
            
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <p className={styles.emptyMessage}>Корзина пустая 😕</p>
          <StartPageBtn />
        </div>
      )}
    </div>
  );
}

export default Cart;
