import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import calculateNumberIngredients from '../utils/calculateNumberIngredients';
import RecipesContext from './RecipesContext';

const RecipesContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [btnText, setBtnText] = useState('Iniciar Receita');

  // const history = useHistory();

  const toggleFavoriteBtnDetails = (recipe, isMeal) => {
    const objRecipe = { id: '' };
    objRecipe.id = isMeal ? recipe.idMeal : recipe.idDrink;
    objRecipe.type = isMeal ? 'comida' : 'bebida';
    objRecipe.area = recipe.strArea ? recipe.strArea : '';
    objRecipe.category = recipe.strCategory;
    objRecipe.alcoholicOrNot = isMeal ? '' : recipe.strAlcoholic;
    objRecipe.name = isMeal ? recipe.strMeal : recipe.strDrink;
    objRecipe.image = isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;

    const lcStorage = localStorage.getItem('favoriteRecipes');
    if (isFavorite) {
      // console.log('isfavorite');
      const favoriteArray = JSON.parse(lcStorage);
      const filteredArray = favoriteArray.filter(
        (r) => {
          const result = isMeal ? recipe.idMeal : recipe.idDrink;
          return r.id !== result;
        },
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredArray));
      setIsFavorite(false);
      return;
    }
    if (lcStorage) {
      // console.log('chave existe mas n tem favorito');
      const parsedStorage = JSON.parse(lcStorage);
      parsedStorage.push(objRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(parsedStorage));
      setIsFavorite(true);
      return;
    }
    // console.log('chave nao existe');
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ ...objRecipe }]));
    setIsFavorite(true);
  };

  const removeFavoriteBtn = (recipe) => {
    console.log(`recipe das receitas favoritas ${recipe}`);
    const lcStorage = localStorage.getItem('favoriteRecipes');
    const favoriteArray = JSON.parse(lcStorage);
    const filteredArray = favoriteArray.filter((r) => r.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredArray));
  };

  const alert = () => {
    global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const fetchMeals = useCallback(({ radioIdsObj, radio }) => {
    fetch(radioIdsObj[radio])
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (!json.meals) {
          // console.log('xablau');
          return alert();
        }

        if (json.meals.length > endIndex) {
          const twelveFirstMeals = json.meals.slice(0, endIndex);
          const withNumberOfIngredients = calculateNumberIngredients(twelveFirstMeals);
          setMeals(withNumberOfIngredients);
          setIsLoading(false);
        } else {
          const withNumberOfIngredients = calculateNumberIngredients(json.meals);
          setMeals(withNumberOfIngredients);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  const fetchDrinks = useCallback(({ radioIdsObj, radio }) => {
    fetch(radioIdsObj[radio])
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (!json.drinks) {
          // console.log('xablau bebidas');
          return alert();
        }
        if (json.drinks.length > endIndex) {
          const twelveFirstDrinks = json.drinks.slice(0, endIndex);
          const withNumberOfIngredients = calculateNumberIngredients(twelveFirstDrinks);
          // console.log(withNumberOfIngredients);
          setDrinks(withNumberOfIngredients);
          setIsLoading(false);
        } else {
          const withNumberOfIngredients = calculateNumberIngredients(json.drinks);
          setDrinks(withNumberOfIngredients);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleBtnClick = useCallback(({ input, isMeal, radio }) => {
    const radioIdsObj = {
      Ingrediente: isMeal ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
      Nome: isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
      'Primeira Letra': isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
    };

    if (radio === 'Primeira Letra' && input.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (isMeal) fetchMeals({ radioIdsObj, radio });
    if (!isMeal) fetchDrinks({ radioIdsObj, radio });
  }, [fetchDrinks, fetchMeals]);

  const getMealsCategories = useCallback(async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const endIndex = 5;
        const fiveFirstCategories = json.meals.slice(0, endIndex);
        setMealsCategories(fiveFirstCategories);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const getDrinksCategories = useCallback(async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const endIndex = 5;
        const fiveFirstCategories = json.drinks.slice(0, endIndex);
        setDrinksCategories(fiveFirstCategories);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    handleBtnClick({
      input: '',
      isMeal: true,
      radio: 'Nome',
    });

    handleBtnClick({
      input: '',
      isMeal: false,
      radio: 'Nome',
    });
  }, [handleBtnClick]);

  const contextValue = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    handleBtnClick,
    mealsCategories,
    drinksCategories,
    getMealsCategories,
    getDrinksCategories,
    isLoading,
    setIsLoading,
    btnText,
    setBtnText,
    isFavorite,
    setIsFavorite,
    removeFavoriteBtn,
    toggleFavoriteBtnDetails,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;

RecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
