import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// import {
// Container,
// Button
// } from '@mui/material';
// import ClearAllIcon from '@mui/icons-material/ClearAll';
// import FoodBankIcon from '@mui/icons-material/FoodBank';
// import LocalBarIcon from '@mui/icons-material/LocalBar';
import Header from '../../components/Header';
import RecipeDoneCard from '../../components/RecipeDoneCard';

import style from './receitasFavoritas.module.scss';

export default function ReceitasFavoritas({ history }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesTemp, setFavoriteRecipesTemp] = useState([]);
  const [favoriteRemove, setFavoriteRemove] = useState(false);

  useEffect(() => {
    const lcStorage = localStorage.getItem('favoriteRecipes');
    if (lcStorage) {
      const doneArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(doneArray);
      setFavoriteRecipesTemp(doneArray);
      setFavoriteRemove(false);
    }
  }, [favoriteRemove]);

  const handleFilterBtn = ({ target: { name } }) => {
    if (name === 'all') {
      setFavoriteRecipesTemp(favoriteRecipes);
    } else {
      const isMeal = name === 'food';
      const filteredRecipes = favoriteRecipes.filter((r) => {
        if (isMeal) {
          return r.type === 'comida';
        }
        return r.type === 'bebida';
      });
      setFavoriteRecipesTemp(filteredRecipes);
    }
  };

  const removeFavorite = () => {
    setFavoriteRemove(true);
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  return (
    <>
      <Header pageTitle="Receitas Favoritas" history={ history } />
      <div className={ style.filters }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilterBtn }
          name="all"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilterBtn }
          name="food"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterBtn }
          name="drink"
        >
          Drink
        </button>
      </div>

      {favoriteRecipesTemp.length > 0
      && favoriteRecipesTemp.map((recipe, index) => (<RecipeDoneCard
        recipe={ recipe }
        index={ index }
        key={ index }
        history={ history }
        shouldHaveFavorite
        removeFavorite={ removeFavorite }
      />))}
    </>
  );
}

ReceitasFavoritas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
