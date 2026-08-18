import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import peperonniwithpepper from './assets/img/peperonniwithpepper.png';
import vagetablesandmushrooms from './assets/img/vagetablesandmushrooms.png';
import cheeseburger from './assets/img/cheeseburger.png';
import cheesechicken from './assets/img/cheesechicken.png';
import cheese from './assets/img/cheese.png';
import shrimppizza from './assets/img/shrimppizza.png';
import pepperoni from './assets/img/pepperoni.png';
import margherita from './assets/img/margherita.png';
import bbqchicken from './assets/img/bbqchicken.png';
import seasons from './assets/img/seasons.png';
import sweet_sour_chicken from './assets/img/sweet_sour_chicken.png';

import './scss/app.scss';
import './App.scss';
import NotFoundBlock from './components/Notfoundblock/Notfound';
import { AppContext } from './CreateContext';
import Headerwithbutton from './components/Headerwithbutton/Headerwithbutton';
import Home from './pages/Home';
import Cart from './pages/Cart/Cart';
export interface Pizza {
  id: number;
  imageUrl?: string;
  title: string;
  types: number[];
  sizes: number[];
  prices: Record<string, number>; // Объект, где ключ — строка, значение — число
  category?: number;
  rating?: number | undefined;
}
export interface images {
  img_1: string;
  img_2: string;
  img_3: string;
  img_4: string;
  img_5: string;
  img_6: string;
  img_7: string;
  img_8: string;
  img_9: string;
  img_10: string;
}
function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [sortType, setSortType] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Pizza[]>('https://e5925c51acc6c42b.mokky.dev/pizzaCards');

        const formattedData: Pizza[] = data.map((pizza) => ({
          ...pizza,
          imageUrl: pizza.imageUrl
            ? pizza.imageUrl.split('/').pop()?.replace('.png', '')
            : `img_${pizza.id + 1}`,
        }));

        setPizzas(formattedData);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        setPizzas([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const imageMap: images = {
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
    <>
      <AppContext.Provider
        value={{
          pizzas: pizzas,
          isLoading: isLoading,
          imageMap: imageMap,
          searchValue: searchValue,
          setSearchValue: setSearchValue,
          setPizzas: setPizzas,
          activeCategory: activeCategory,
          setActiveCategory: setActiveCategory,
          sortType: sortType,
          setSortType: setSortType,
        }}>
        <div className="HomePage">
          <div className="header-layout">
            {/* Добавляем эту обертку */}
            <Headerwithbutton />
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            {/* Добавьте другие маршруты при необходимости */}
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
