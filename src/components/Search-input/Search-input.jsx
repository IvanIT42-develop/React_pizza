import React, { useContext } from 'react'; // Добавили useContext
import { AppContext } from '../../CreateContext';
import styles from './Search-input.module.scss';
import btnremove from '../../assets/img/btn-remove.png';

function Searchinputandcontent_title() {
  // Берем данные напрямую из глобального контекста
  const { searchValue, setSearchValue } = useContext(AppContext);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  
  return (
    // УДАЛИЛИ AppContext.Provider отсюда!
    <div className={styles.content__titleandsearchinput}>
      <h2 className={searchValue ? styles.h2_with_searchValue : styles.h2_large}>
        {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все пиццы'}
      </h2>

      <div className={styles.input_with_deletimg}>
        <input
          type="text"
          className={styles['search-input']}
          placeholder="Поиск..."
          value={searchValue}
          onChange={onChangeSearchInput}
        />
        {searchValue && ( // Показывать кнопку удаления, только если есть текст
          <img 
            src={btnremove} 
            alt="Clear" 
            onClick={() => setSearchValue('')} 
            className={styles.deleteimg} 
          />
        )}
      </div>
    </div>
  );
}
export default Searchinputandcontent_title;