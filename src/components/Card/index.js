import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Card as CardActionArea,
} from '@mui/material';
import style from './card.module.scss';
import RecipesContext from '../../context/RecipesContext';

function Card({ index, recipeImage, recipeName, link, ingredientsNumber }) {
  const history = useHistory();
  const { setIsLoading } = useContext(RecipesContext);
  const goToRecipeDetails = () => {
    setIsLoading(true);
    history.push(link);
  };

  return (
    <button
      className={ style.card }
      type="button"
      onClick={ goToRecipeDetails }
      sx={ { maxWidth: 360, margin: 2, align: 'center' } }
      data-testid={ `${index}-recipe-card` }
    >

      <CardActionArea>

        <img
          src={ recipeImage }
          alt={ `${recipeName}` }
          data-testid={ `${index}-card-img` }
        />

        <div className={ style.title }>
          <h5 data-testid={ `${index}-card-name` }>
            {recipeName}
          </h5>
          <h6>
            { ingredientsNumber || 'Alguns' }
            {' '}
            ingredientes
            {' '}
          </h6>
        </div>

      </CardActionArea>

    </button>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  // recipe: PropTypes.shape().isRequired,
  ingredientsNumber: PropTypes.number.isRequired,
};

export default Card;
