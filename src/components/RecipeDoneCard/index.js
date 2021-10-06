import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import favoritedIcon from '../../images/blackHeartIcon.svg';
import unfavoritedIcon from '../../images/whiteHeartIcon.svg';

// import './css/Card.css';
import RecipesContext from '../../context/RecipesContext';

import style from './recipeDoneCard.module.scss';
import CopyLinkModal from '../CopyLinkModal';

const RecipeDoneCard = ({ recipe, index, history, shouldHaveFavorite,
  removeFavorite }) => {
  const { removeFavoriteBtn, isFavorite } = useContext(RecipesContext);
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);
  const { type } = recipe;

  const handleFavoriteBtn = () => {
    removeFavoriteBtn(recipe);
    removeFavorite();
  };

  const handleShareBtn = (recipeId, recipeType, recipeIndex) => {
    const isMeal = recipeType === 'comida';
    copy(`http://localhost:3000/${isMeal ? 'comidas/' : 'bebidas/'}${recipeId}`);
    setShouldDisplayMessage(true);
    console.log(recipeIndex);
    // const h4 = document.createElement('h4');
    // h4.textContent = 'Link copiado!';
    // const father = document
    //   .querySelector(`[data-testid="${recipeIndex}-horizontal-share-btn"]`);
    // father.insertAdjacentElement('afterend', h4);
  };

  const handleTitleImgClick = (rec) => {
    const isMeal = rec.type === 'comida';
    history.push(`/${isMeal ? 'comidas/' : 'bebidas/'}${rec.id}`);
  };

  return (
    <div className={ style.card }>
      <input
        type="image"
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        onClick={ () => handleTitleImgClick(recipe) }
        className="recipe-image"
      />
      <div className={ style.title }>
        <div>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            { type === 'comida'
              ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot }
          </h5>
          <Link
            to={ `/${recipe.type === 'comida' ? 'comidas/' : 'bebidas/'}${recipe.id}` }
          >
            <h6 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h6>
          </Link>
          <h6 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h6>
        </div>
        <div>
          <input
            type="image"
            src={ shareIcon }
            alt="compartilhar receita"
            onClick={ () => handleShareBtn(recipe.id, recipe.type, index) }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          {shouldHaveFavorite && <input
            type="image"
            src={ isFavorite ? favoritedIcon : unfavoritedIcon }
            alt="desfavoritar receita"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ handleFavoriteBtn }
          /> }
          {recipe.tags && recipe.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {
        shouldDisplayMessage
        && <CopyLinkModal setShouldDisplayMessage={ setShouldDisplayMessage } />
      }
    </div>
  );
};

RecipeDoneCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldHaveFavorite: PropTypes.bool.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default RecipeDoneCard;
