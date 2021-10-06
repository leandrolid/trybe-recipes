import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecomendationCard from '../RecomendationCard';
// import './css/RecipeDetails.css';

import style from './recipeRecomendations.module.scss';

const RecipeRecomendations = ({ isMeal }) => {
  const [recomendation, setRecomendation] = useState([]);
  const MAX_RECIPES = 6;
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(isMeal
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=');

      const json = await res.json();

      if (isMeal) {
        setRecomendation(json.drinks.slice(0, MAX_RECIPES));
      } else {
        setRecomendation(json.meals.slice(0, MAX_RECIPES));
      }
    };

    fetching();
  }, [isMeal]);

  return (
    <div className={ style.recomendationContent }>
      <div className={ style.recomendationContainer }>
        {
          recomendation.length > 0 && recomendation.map((recipe, i) => {
            if (isMeal) {
              return (
                <RecomendationCard
                  key={ `${recipe} ${i}` }
                  name={ recipe.strDrink }
                  thumb={ recipe.strDrinkThumb }
                  index={ i }
                />
              );
            }
            return (
              <RecomendationCard
                key={ `${recipe} ${i}` }
                name={ recipe.strMeal }
                thumb={ recipe.strMealThumb }
                index={ i }
              />);
          })
        }
      </div>
    </div>
  );
};

RecipeRecomendations.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default RecipeRecomendations;
