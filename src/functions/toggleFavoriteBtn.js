const toggleFavoriteBtn = (recipe, isMeal) => {
  const lcStorage = localStorage.getItem('favoriteRecipes') || [];
  const recipeExist = JSON.parse(lcStorage).some((r) => (
    r.id === isMeal ? recipe.idMeal : recipe.idDrink));
  if (recipeExist) {
    const favoriteArray = JSON.parse(lcStorage);
    const filteredArray = favoriteArray.map(
      (r) => (r.id !== isMeal ? recipe.idMeal : recipe.idDrink),
    );
    localStorage.setItem('favoriteRecipes', filteredArray);
    return;
  }
  const parsedStorage = JSON.parse(lcStorage);
  const objRecipe = { id: '' };
  objRecipe.id = isMeal ? recipe.idMeal : recipe.idDrink;
  objRecipe.type = isMeal ? 'comida' : 'bebida';
  objRecipe.area = recipe.strArea ? recipe.strArea : '';
  objRecipe.category = recipe.strCategory;
  objRecipe.alcoholicOrNot = isMeal ? '' : recipe.strAlcoholic;
  objRecipe.name = isMeal ? recipe.strMeal : recipe.strDrink;
  objRecipe.image = isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;
  parsedStorage.push(objRecipe);
};

export default toggleFavoriteBtn;
