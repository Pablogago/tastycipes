const apiKey = "2e62e7ca1c0bb24a2b9cd1586f1e460e";
const apiId = "bf148247"

export async function fetchRecipe(recipe,num){
  const response = await fetch(`https://api.edamam.com/search?q=${recipe}&to=${num}&app_id=${apiId}&app_key=${apiKey}`,{cache: 'force-cache'});
  const data = await response.json();
  return data.hits;
  }

  