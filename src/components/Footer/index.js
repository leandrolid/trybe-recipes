import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import RecipesContext from '../../context/RecipesContext';

import style from './footer.module.scss';

function Footer() {
  const { setIsLoading } = useContext(RecipesContext);

  const history = useHistory();
  const current = history.location.pathname;

  const goToDrinks = () => {
    if (current !== '/bebidas') {
      setIsLoading(true);
      history.push('/bebidas');
    }
  };
  const goToExplore = () => {
    if (current !== '/explorar') {
      setIsLoading(true);
      history.push('/explorar');
    }
  };
  const goToMeals = () => {
    if (current !== '/comidas') {
      setIsLoading(true);
      history.push('/comidas');
    }
  };

  return (
    <footer data-testid="footer" className={ style.footer }>
      <button type="button" onClick={ goToDrinks }>
        <img src={ drinkIcon } alt="Bebidas" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ goToExplore }>
        <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
      </button>
      <button type="button" onClick={ goToMeals }>
        <img src={ mealIcon } alt="Comidas" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
