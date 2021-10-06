import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RecipesContext from '../../context/RecipesContext';

import style from './startRecipeBtn.module.scss';

const StartRecipeBtn = ({ history, recipe, isMeal }) => {
  const { btnText, setIsLoading } = useContext(RecipesContext);

  const handleStartRecipeBtn = () => {
    setIsLoading(true);
    history.push(isMeal ? `/comidas/${recipe.idMeal}/in-progress`
      : `/bebidas/${recipe.idDrink}/in-progress`);
  };

  return (
    <button
      className={ style.startButton }
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleStartRecipeBtn }
    >
      {btnText}
      { ' ' }
      <ArrowForwardIcon />
    </button>
  );
};

StartRecipeBtn.propTypes = {
  recipe: PropTypes.shape({
    strTags: PropTypes.string,
    strMeal: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  isMeal: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default StartRecipeBtn;
