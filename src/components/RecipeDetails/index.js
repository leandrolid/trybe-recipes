import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Typography } from '@mui/material';
import shareIcon from '../../images/shareIcon.svg';
import favoritedIcon from '../../images/blackHeartIcon.svg';
import unfavoritedIcon from '../../images/whiteHeartIcon.svg';
import RecipeRecomendations from '../RecipeRecomendations';
// import '../css/RecipeDetails.css';
import StartRecipeBtn from '../StartRecipeBtn';
import RecipesContext from '../../context/RecipesContext';

import style from './recipeDetails.module.scss';
import ButtonBack from '../ButtonBack';
import CopyLinkModal from '../CopyLinkModal';

const copy = require('clipboard-copy');

const RecipeDetails = ({ recipe, isMeal, showBtn, history }) => {
  const { toggleFavoriteBtnDetails, isFavorite } = useContext(RecipesContext);
  const recipeIngredients = [];

  const getIngredients = () => {
    const MAX_INGREDIENTS = 16;
    for (let i = 0; i < MAX_INGREDIENTS; i += 1) {
      const auxObj = { name: '', measure: '' };
      if (recipe[`strIngredient${i}`]) {
        auxObj.name = recipe[`strIngredient${i}`];
        auxObj.measure = recipe[`strMeasure${i}`];
        recipeIngredients.push(auxObj);
      }
    }

    return (
      <ul className={ style.ingredients }>
        {recipeIngredients.map((ingredient, i) => (
          <li
            key={ `${ingredient.name} ${i}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            <span>{ingredient.name}</span>
            <span>{ingredient.measure}</span>
          </li>
        ))}
      </ul>
    );
  };

  // const handleShareBtn = () => {
  //   const { location: { pathname } } = history;
  //   copy(`http://localhost:3000${pathname}`);

  //   const h4 = document.createElement('h4');
  //   h4.textContent = 'Link copiado!';
  //   const father = document.querySelector('[data-testid="recipe-category"]');
  //   father.insertAdjacentElement('afterend', h4);
  // };

  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);
  const handleCopy = () => {
    const routeWithoutInProgress = history.location.pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${routeWithoutInProgress}`);
    setShouldDisplayMessage(true);
  };

  return (
    <main className={ style.details }>
      <div className={ style.header }>
        <ButtonBack />
        <h2 data-testid="recipe-title">
          {isMeal ? recipe.strMeal : recipe.strDrink}
        </h2>
        <div className={ style.shareAndFavorite }>
          <input
            type="image"
            src={ shareIcon }
            alt="compartilhar receita"
            data-testid="share-btn"
            onClick={ handleCopy }
          />
          <input
            type="image"
            src={ isFavorite ? favoritedIcon : unfavoritedIcon }
            alt="favoritar receita"
            data-testid="favorite-btn"
            onClick={ () => toggleFavoriteBtnDetails(recipe, isMeal) }
          />
        </div>
      </div>
      <img
        data-testid="recipe-photo"
        src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isMeal ? 'foto da comida' : 'foto do drink' }
      />
      <CardContent>
        <h3 data-testid="recipe-category">
          {`${recipe.strCategory} ${isMeal ? '' : recipe.strAlcoholic}`}
        </h3>

        { getIngredients() }

        <div className={ style.instructions }>
          <Typography
            data-testid="instructions"
            variant="body1"
            component="p"
          >
            {recipe.strInstructions}
          </Typography>
        </div>
        { isMeal
          && (
            <a data-testid="video" href={ recipe.strYoutube } target="blank">
              Video
            </a>)}

      </CardContent>
      {/* <div className="recomendation-content">
      <div className={style.recomendationContainer}>

        </div>
      </div> */}

      <RecipeRecomendations isMeal={ isMeal } />
      {showBtn && <StartRecipeBtn
        history={ history }
        recipe={ recipe }
        isMeal={ isMeal }
      /> }

      {
        shouldDisplayMessage
        && <CopyLinkModal setShouldDisplayMessage={ setShouldDisplayMessage } />
      }
    </main>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    strIngredient: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  isMeal: PropTypes.bool.isRequired,
  showBtn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string,
    }),
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeDetails;
