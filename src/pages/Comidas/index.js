import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import RecipesContext from '../../context/RecipesContext';
import ButtonFilter from '../../components/ButtonFilter';
import Loading from '../../components/Loading';

import style from './comidas.module.scss';
import calculateNumberIngredients from '../../utils/calculateNumberIngredients';

export default function Comidas({ history }) {
  const {
    meals,
    handleBtnClick,
    getMealsCategories,
    mealsCategories,
    // isLoading,
    // setIsLoading,
    setMeals,
  } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [firstRecipe, setFirstRecipe] = useState(() => {
    const [first] = meals;
    return first;
  });
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  useEffect(() => {
    if (meals.length === 1 && meals[0].strCategory) {
      history.push(`/comidas/${meals[0].idMeal}`);
    }
  }, [history, meals]);

  useEffect(() => {
    getMealsCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  }, [getMealsCategories]);

  useEffect(() => {
    if (meals.length > 0 && mealsCategories) setIsLoading(false);
    setFirstRecipe(meals[0]);
  }, [meals, mealsCategories, setIsLoading]);

  const getMealsByCategory = (categoryName) => {
    setIsCardsLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (json.meals.length > endIndex) {
          const twelveFirstMeals = json.meals.slice(0, endIndex);
          const withNumberOfIngredients = calculateNumberIngredients(twelveFirstMeals);
          setMeals(withNumberOfIngredients);
          setIsCardsLoading(false);
        } else {
          const withNumberOfIngredients = calculateNumberIngredients(json.meals);
          setMeals(withNumberOfIngredients);
          setIsCardsLoading(false);
        }
      });
  };

  return (
    isLoading
      ? <Loading />
      : (
        <>
          <Header pageTitle="Comidas" history={ history } isMeal />
          <div className={ style.filters }>
            <ButtonFilter
              categoryName="All"
              fetchByCategory={ () => {
                handleBtnClick({
                  input: '',
                  isMeal: true,
                  radio: 'Nome',
                });
              } }
              isMeal="meal"
            >
              All
            </ButtonFilter>
            {
              mealsCategories.map((category) => (
                <ButtonFilter
                  firstRecipe={ firstRecipe }
                  key={ category.strCategory }
                  categoryName={ category.strCategory }
                  fetchByCategory={ getMealsByCategory }
                  isMeal="meal"
                />))
            }
          </div>

          {
            isCardsLoading
              ? <Loading />
              : (
                <>
                  {
                    meals.map((meal, index) => (
                      <Card
                        key={ meal.idMeal }
                        index={ index }
                        recipe={ meal }
                        recipeImage={ meal.strMealThumb }
                        recipeName={ meal.strMeal }
                        link={ `/comidas/${meal.idMeal}` }
                        ingredientsNumber={ meal.numberIngredients }
                      />
                    ))
                  }
                </>
              )
          }

          <Footer />
        </>
      )

  );
}

Comidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
