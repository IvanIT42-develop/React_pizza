import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './Cart.module.css';
import StartPageBtn from '../../components/startPageBtn/startPageBtn';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addItem } from '../../store/slices/createSlice';
function Cart() {
  const { cartItems, setCartItems } = useCart();
  const dispatch = useDispatch();

  // 1. Группируем товары перед отрисовкой
  // Создаем массив, где одинаковые товары объединены, и у них есть поле count
  const groupedItems = cartItems.reduce((acc, item) => {
    // Ищем, есть ли уже такой товар в нашем аккумуляторе (по id или title)
    const existingItem = acc.find((target) => target.title === item.title);

    if (existingItem) {
      // Если есть — увеличиваем счетчик
      existingItem.count += 1;
    } else {
      // Если нет — добавляем новый объект с count: 1
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
      // Если остался один — удаляем из БД и стейта
      await deleteCartItem(obj.id);
    } else {
      // Если больше одного — нам нужно найти ID ОДНОГО такого товара в исходном массиве cartItems
      // и удалить его (или изменить количество в БД, если ваша база это поддерживает)

      // В текущей архитектуре проще всего найти индекс последнего вхождения такого товара:
      const itemToDelete = cartItems.find((item) => item.title === obj.title);
      if (itemToDelete) {
        await deleteCartItem(itemToDelete.id);
      }
    }
  };
   const handlePlus = async (obj) => {
    try {
      const { id, count, ...newItem } = obj;
      const { data } = await axios.post('https://e5925c51acc6c42b.mokky.dev/cartItems', newItem);
      
      // Сначала обновляем Redux (чтобы цена в шапке прыгнула)
      dispatch(addItem(data));
      
      // СРАЗУ обновляем локальный список, чтобы groupedItems пересчитался
      setCartItems((prev) => [...prev, data]); 
      
    } catch (error) {
      alert('Не удалось добавить товар');
    }
  };
const del = async(obj)=>{
  const itemsToDelete=cartItems.find((item) => item.title === obj.title);
  try{
    await Promise.all(
    itemsToDelete.map((item)=>{
      axios.delete(`https://e5925c51acc6c42b.mokky.dev/cartItems/${item.id}`)
    })
  )
  setCartItems((prev)=>prev.filter((item)=> item.title== obj.title))
  }
  catch(error){
    alert("Не удалось удалить товар из корзины")
  }
}
  return (
    <div className={styles.cartWrapper}>
      <h2 className={styles.title}>Корзина</h2>

      {groupedItems.length > 0 ? (
        <div className={styles.itemsList}>
          {groupedItems.map((obj) => (
            <div key={obj.id} className={styles.cartItem}>
              <img className={styles.itemImg} width={70} src={obj.imageUrl} alt={obj.title} />
              <div className={styles.itemInfo}>
                <p>{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <div className={styles.countControl}>
                <button
                  onClick={() => {
                    handleMinus(obj);
                  }}>
                  -
                </button>
                {/* 2. Выводим количество */}
                <span className={styles.countBadge}>{obj.count} шт.</span>
                <button onClick={() => handlePlus(obj)}>+</button>
              </div>
            </div>
          ))}
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
