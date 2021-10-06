import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';
import Loading from '../components/Loading';

function InProgressBebidas({ match: { params: { recipeId } } }) {
  const [drink, setDrink] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await res.json();
      // console.log(json.drinks[0]);
      setDrink(json.drinks[0]);
      setIsLoading(false);
    };

    fetching();
  }, [recipeId]);

  return (
    isLoading
      ? <Loading />
      : <RecipeInProgress recipe={ drink } isMeal={ false } />
  );
}

InProgressBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default InProgressBebidas;
