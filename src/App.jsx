import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './scss/app.scss';
import PizzaCard from './components/PizzaCard/PizzaCard';
import Categories from './components/Categories/Categories';
import './App.css';
import pizzas from './assets/pizza.json';
import cheeseburger from './assets/img/cheeseburger.png';
import cheesechicken from './assets/img/cheesechicken.png';
import cheese from './assets/img/cheese.png';
import shrimppizza from './assets/img/shrimppizza.png';
import Sort from './components/Sort/Sort';
import MyLoader from './components/Contentloader/ContentLoader';
function App() {
  const [searchValue, setSearchValue] = useState('');
  console.log(pizzas);
  const imageMap = {
    cheeseburger: cheeseburger,
    cheesechicken: cheesechicken,
    cheese: cheese,
    shrimppizza: shrimppizza,
  };
  return (
    <>
      <div id="root">
        <div className="wrapper">
          <div className="header">
            <div className="container">
              <a href="/">
                <div className="header__logo">
                  <img
                    width="38"
                    src="/static/media/pizza-logo.56ac87032d8f6fdf863326acd06c0d97.svg"
                    alt="Pizza logo"
                  />
                  <div>
                    <h1>React Pizza V2</h1>
                    <p>самая вкусная пицца во вселенной</p>
                  </div>
                </div>
              </a>

              <div className="Search_root__eiX89">
                <svg
                  className="Search_icon__XMmYc"
                  enableBackground="new 0 0 32 32"
                  id="EditableLine"
                  version="1.1"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"></circle>
                  <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"></line>
                </svg>
                <input
                  className="Search_input__klILD"
                  placeholder="Поиск пиццы..."
                  value=""
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <div className="header__cart">
                <a className="button button--cart" href="/cart">
                  <span>0</span>
                  <div className="button__delimiter"></div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"></path>
                    <path
                      d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"></path>
                    <path
                      d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"></path>
                  </svg>
                  <span>0</span>
                </a>
              </div>
            </div>
          </div>
          <Categories />
          <div className="content">
            <div className="container">
              <div className="content__top">
              <Sort></Sort>
              </div>

              <h2 className="content__title">Все пиццы</h2>

              <div className="content__error-info">
                <h2>Произошла ошибка 😕</h2>
                <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
              </div>
              <div>
                <div className="allpizzas">
                  {pizzas.map((obj, index) => {
                    return <PizzaCard {...obj} imageMap={imageMap} key={index} />;
                  })}
                </div>
              </div>
              <ul className="Pagination_root__uwB0O">
                <li className="previous disabled">
                  <a
                    className=" "
                    tabIndex="-1"
                    role="button"
                    aria-disabled="true"
                    aria-label="Previous page"
                    rel="prev">
                    &lt;
                  </a>
                </li>
                <li className="selected">
                  <a
                    rel="canonical"
                    role="button"
                    tabIndex="-1"
                    aria-label="Page 1 is your current page"
                    aria-current="page">
                    1
                  </a>
                </li>
                <li>
                  <a rel="next" role="button" tabIndex="0" aria-label="Page 2">
                    2
                  </a>
                </li>
                <li>
                  <a role="button" tabIndex="0" aria-label="Page 3">
                    3
                  </a>
                </li>
                <li className="next">
                  <a
                    className=""
                    tabIndex="0"
                    role="button"
                    aria-disabled="false"
                    aria-label="Next page"
                    rel="next">
                    &gt;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
