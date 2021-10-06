import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

import style from './cardIngredient.module.scss';

function CardIngredient({ index, IngredientName, isMeal }) {
  const { handleBtnClick } = useContext(RecipesContext);
  const history = useHistory();

  const filterByIngredient = async () => {
    await handleBtnClick({
      input: IngredientName,
      isMeal,
      radio: 'Ingrediente',
    });

    if (isMeal) history.push('/comidas');
    else history.push('/bebidas');
  };

  return (

    <button
      className={ style.card }
      type="button"
      onClick={ filterByIngredient }
      data-testid={ `${index}-ingredient-card` }
    >

      <div className="recipe-card">
        <img
          src={
            isMeal ? `https://www.themealdb.com/images/ingredients/${IngredientName}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${IngredientName}-Small.png`
          }
          alt={ IngredientName }
          data-testid={ `${index}-card-img` }
          // style={ { width: '100vw', maxWidth: '500px' } }
        />

        <div className={ style.title }>
          <h5 data-testid={ `${index}-card-name` }>
            {IngredientName}
          </h5>
        </div>
      </div>

    </button>
  );
}

CardIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
  IngredientName: PropTypes.string.isRequired,
};

export default CardIngredient;
