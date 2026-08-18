import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, minusItem } from '../../store/slices/createSlice';
import leftpath from '../../assets/img/leftpath.png';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import StartPageBtn from '../../components/startPageBtn/startPageBtn';
import { CartItemFromServer, useCart } from '../../hooks/useCart';
import { Pizza } from '../../App';

function Cart() {
  interface CartItem {
    id: Pizza['id'];
    imageUrl?: Pizza['imageUrl'];
    title: Pizza['title'];
    prices: Pizza['prices'];
    size: number;
    count: number;
  }

  const { cartItems, setCartItems } = useCart();
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  // ИСПРАВЛЕНО: Правильная инициализация стейта загрузки
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const dispatch = useDispatch();

  type CartItemId = CartItem['id'];
  useEffect(() => {
    if (cartItems !== undefined) {
      setIsLoading(false);
    }
  }, [cartItems]);

  // Группируем товары перед отрисовкой
  const groupedItems = cartItems.reduce((acc: CartItem[], item: CartItemFromServer) => {
    const existingItem = acc.find(
      (target: CartItem) => target.title === item.title && target.size === item.size,
    );
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, [] as CartItem[])

  const deleteCartItem = async (id: CartItemId) => {
    try {
      await axios.delete(`https://e5925c51acc6c42b.mokky.dev/cartItems/${id}`);
      setCartItems((prev) => prev.filter((item: CartItemFromServer) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Ошибка при удалении');
    }
  };

  const handleMinus = async (obj: CartItem) => {
    if (obj.count === 1) {
      await deleteCartItem(obj.id);
      dispatch(minusItem(obj.id)); // ИСПРАВЛЕНО: была переменная itemToDelete, которой еще нет в этой ветке
    } else {
      const itemToDelete = cartItems.find(
        (item: CartItemFromServer) => item.title === obj.title && item.size === obj.size,
      );
      if (itemToDelete) {
        await deleteCartItem(itemToDelete.id);
        dispatch(minusItem(itemToDelete.id));
      }
    }
  };

  const handlePlus = async (obj: CartItem) => {
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

  // 1. ДОБАВЛЕНО: Проверка на процесс загрузки. Экран не будет моргать "пустой корзиной"
  if (isLoading) {
    return (
      <div className={styles.cartWrapper}>
        <h2 className={styles.title}>Загрузка корзины...</h2>
        <div className={styles.loadingSpinner}>
          {/* Здесь может быть ваш спиннер или скелетон */}
          <p>Пожалуйста, подождите, мы собираем вашу корзину 🍕</p>
        </div>
      </div>
    );
  }

  // 2. Основной рендер (срабатывает только когда isLoading === false)
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
                <b>{(obj.prices?.[obj.size] || 0) * obj.count} руб.</b>
              </div>
              <div className={styles.countControl}>
                <button onClick={() => handleMinus(obj)}> - </button>
                <span className={styles.countBadge}>{obj.count} шт.</span>
                <button disabled={isUpdating} onClick={() => handlePlus(obj)}>
                  +
                </button>
              </div>
            </div>
          ))}

          <div className={styles.cartBottom}>
            <div className={styles.cartBottomDetails}>
              <span>
                Всего пицц: <b>{items.length} шт.</b>
              </span>
              <span>
                Сумма заказа: <b className={styles.totalPrice}>{totalPrice} ₽</b>
              </span>
            </div>

            <div className={styles.cartBottomButtons}>
              <Link to="/">
                <button className={styles.backBtn}>
                  <img src={leftpath} className={styles.leftpath} alt="Назад" /> Вернуться назад
                </button>
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
