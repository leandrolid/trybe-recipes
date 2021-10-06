function formatRecipeToFavorite(favoriteRecipe, isMeal) {
  const favorite = {
    alcoholicOrNot: favoriteRecipe.strAlcoholic || '',
    area: favoriteRecipe.strArea || '',
    category: favoriteRecipe.strCategory,
    id: favoriteRecipe.idMeal || favoriteRecipe.idDrink,
    image: favoriteRecipe.strMealThumb || favoriteRecipe.strDrinkThumb,
    name: favoriteRecipe.strMeal || favoriteRecipe.strDrink,
    type: isMeal ? 'comida' : 'bebida',
  };

  return favorite;
}

export default formatRecipeToFavorite;
