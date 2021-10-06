import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import RecipesContext from '../../context/RecipesContext';
import ButtonFilter from '../../components/ButtonFilter';
import Loading from '../../components/Loading';

import style from './bebidas.module.scss';
import calculateNumberIngredients from '../../utils/calculateNumberIngredients';

export default function Bebidas({ history }) {
  const {
    drinks,
    handleBtnClick,
    drinksCategories,
    getDrinksCategories,
    // isLoading,
    // setIsLoading,
    setDrinks,
  } = useContext(RecipesContext);
  const [firstRecipe, setFirstRecipe] = useState(() => {
    const [first] = drinks;
    return first;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  useEffect(() => {
    if (drinks.length === 1 && drinks[0].strCategory) {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  }, [drinks, history]);

  useEffect(() => {
    getDrinksCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  }, [getDrinksCategories]);

  useEffect(() => {
    if (drinks.length > 0 && drinksCategories) setIsLoading(false);
    setFirstRecipe(drinks[0]);
  }, [drinks, drinksCategories, setIsLoading]);

  const getDrinksByCategory = (categoryName) => {
    setIsCardsLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (json.drinks.length > endIndex) {
          const twelveFirstDrinks = json.drinks.slice(0, endIndex);
          const withNumberOfIngredients = calculateNumberIngredients(twelveFirstDrinks);
          setDrinks(withNumberOfIngredients);
          setIsCardsLoading(false);
        } else {
          const withNumberOfIngredients = calculateNumberIngredients(json.drinks);
          setDrinks(withNumberOfIngredients);
          setIsCardsLoading(false);
        }
      });
  };

  return (
    isLoading
      ? <Loading />
      : (
        <>
          <Header pageTitle="Bebidas" history={ history } isMeal={ false } />
          <div className={ style.filters }>
            <ButtonFilter
              categoryName="All"
              fetchByCategory={ () => {
                handleBtnClick({
                  input: '',
                  isMeal: false,
                  radio: 'Nome',
                });
              } }
              isMeal="drink"
            >
              All
            </ButtonFilter>
            {
              drinksCategories.map((category) => (
                <ButtonFilter
                  firstRecipe={ firstRecipe }
                  key={ category.strCategory }
                  categoryName={ category.strCategory }
                  fetchByCategory={ getDrinksByCategory }
                  isMeal="drink"
                />))
            }
          </div>
          {
            isCardsLoading
              ? <Loading />
              : (
                <>
                  { drinks.map((drink, index) => (
                    <Card
                      key={ drink.idDrink }
                      index={ index }
                      recipe={ drink }
                      recipeImage={ drink.strDrinkThumb }
                      recipeName={ drink.strDrink }
                      link={ `/bebidas/${drink.idDrink}` }
                      ingredientsNumber={ drink.numberIngredients }
                    />
                  )) }
                </>
              )
          }

          <Footer />
        </>
      )

  );
}

Bebidas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
