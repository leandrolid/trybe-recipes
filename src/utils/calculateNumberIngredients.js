export default function calculateNumberIngredients(recipes) {
  const recipesWithIngredientNumber = recipes.map((recipe) => {
    const entries = Object.entries(recipe);
    const ingredients = entries
      .filter(([chave, valor]) => chave.includes('Ingredient') && valor);

    return { ...recipe, numberIngredients: ingredients.length };
  });

  // console.log(recipesWithIngredientNumber);

  return recipesWithIngredientNumber;
}
