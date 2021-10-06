import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';
import Loading from '../components/Loading';
// import RecipesContext from '../context/RecipesContext';

export default function InProgressComidas({ match: { params: { recipeId } } }) {
  const [meal, setMeal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const { isLoading, setIsLoading } = useContext(RecipesContext);
  const isTrue = true;

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const json = await res.json();
        setMeal(json.meals[0]);
        setIsLoading(false);
      } catch (error) {
        // document.innerHTML = error.message;
        console.log('InProgressComidas', error.message);
      }
    };

    fetching();
  }, [recipeId, setIsLoading]);

  return (
    isLoading
      ? <Loading />
      : <RecipeInProgress recipe={ meal } isMeal={ isTrue } />
  );
}

InProgressComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};
