import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './scss/app.scss';
import PizzaCard from './components/PizzaCard/PizzaCard';
import Categories from './components/Categories/Categories';
import './App.css';

// Импорт всех изображений
import peperonniwithpepper from './assets/img/peperonniwithpepper.png';
import vagetablesandmushrooms from './assets/img/vagetablesandmushrooms.png';
import cheeseburger from './assets/img/cheeseburger.png';
import cheesechicken from './assets/img/cheesechicken.png';
import cheese from './assets/img/cheese.png';
import shrimppizza from './assets/img/shrimppizza.png';

// Импорт недостающих изображений
import pepperoni from './assets/img/pepperoni.png';
import margherita from './assets/img/margherita.png';
import bbqchicken from './assets/img/bbqchicken.png';
import seasons from './assets/img/seasons.png';
import sweet_sour_chicken from './assets/img/sweet_sour_chicken.png';

import Sort from './components/Sort/Sort';
import MyLoader from './components/Contentloader/ContentLoader';
import axios from 'axios';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AppContext } from './CreateContext';
import Header from './components/Header/Header';
import Cart from './pages/Cart';
function App() {
  const [searchValue, setSearchValue] = useState('');
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('https://68ea8ba9f1eeb3f856e79540.mockapi.io/dd/Pizzas');

        const formattedData = data.map((pizza) => ({
          ...pizza,
          imageUrl: pizza.imageUrl
            ? pizza.imageUrl.split('/').pop().replace('.png', '')
            : `img_${pizza.id + 1}`,
        }));

        setPizzas(formattedData);
        console.log('Форматированные данные:', formattedData);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        setPizzas([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const imageMap = {
    img_1: peperonniwithpepper,
    img_2: cheese,
    img_3: bbqchicken,
    img_4: sweet_sour_chicken,
    img_5: cheeseburger,
    img_6: pepperoni,
    img_7: shrimppizza,
    img_8: margherita,
    img_9: seasons,
    img_10: vagetablesandmushrooms,
  };

  return (
    <AppContext.Provider
      value={{
        pizzas: pizzas,
        isLoading: isLoading,
        imageMap: imageMap,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
      }}>

    <div className='HomePage'>
     <Header/>
        <Routes>
        <Route path="/" element={<Home />} />
        {/* Добавьте другие маршруты при необходимости */}
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </div>

    </AppContext.Provider>
  );
}

export default App;
