import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// import { Button } from '@mui/material';
// import ClearAllIcon from '@mui/icons-material/ClearAll';
// import FoodBankIcon from '@mui/icons-material/FoodBank';
// import LocalBarIcon from '@mui/icons-material/LocalBar';
import Header from '../../components/Header';
import RecipeDoneCard from '../../components/RecipeDoneCard';

import style from './receitasFeitas.module.scss';

export default function ReceitasFeitas({ history }) {
  const [recipeDone, setRecipeDone] = useState([]);
  const [recipeDoneTemp, setRecipeDoneTemp] = useState([]);

  useEffect(() => {
    const lcStorage = localStorage.getItem('doneRecipes');
    if (lcStorage) {
      const doneArray = JSON.parse(lcStorage);
      setRecipeDone(doneArray);
      setRecipeDoneTemp(doneArray);
    }
  }, []);

  const handleFilterBtn = ({ target: { name } }) => {
    if (name === 'all') {
      setRecipeDoneTemp(recipeDone);
    } else {
      const isMeal = name === 'food';
      const filteredRecipes = recipeDone.filter((r) => {
        if (isMeal) {
          return r.type === 'comida';
        }
        return r.type === 'bebida';
      });
      setRecipeDoneTemp(filteredRecipes);
    }
  };

  return (
    <>
      <Header pageTitle="Receitas Feitas" history={ history } isMeal />

      <aside className={ style.filters }>
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
      </aside>

      <main className={ style.doneRecipes }>
        {recipeDoneTemp.length > 0 && recipeDoneTemp.map((recipe, index) => (
          <RecipeDoneCard
            recipe={ recipe }
            index={ index }
            key={ index }
            history={ history }
          />
        )) }
      </main>
    </>
  );
}

ReceitasFeitas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
