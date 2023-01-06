// document.querySelector("button").addEventListener("click", getQuote);
// document.querySelector("input").addEventListener("keypress", function (event)
//   // If the user presses the "Enter" key on the keyboard
// if (event.key === "Enter") {
// Cancel the default action, if needed
// event.preventDefault();
// Trigger the button element with a click
//   getPoke();
// }
// });
// function getQuote() {
//   fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
//     .then((res) => res.json()) // parse response as JSON
//     .then((data) => {
//       console.log(data);
//       let myMeal = data.meals[0];
//       document.querySelector("h2").innerText = myMeal.strMeal;
//       document.querySelector("body h3:nth-of-type(1)").innerText =
//         myMeal.strInstructions;
//       document.getElementById("mealPic").src = myMeal.strMealThumb;
//     })
//     .catch((err) => {
//       console.log(`error ${err}`);
//     });
// }

//Initial References

let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/random.php";

searchBtn.addEventListener("click", getRecipe);

function getRecipe() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let myMeal = data.meals[0];
      console.log(myMeal);
      console.log(myMeal.strMealThumb);
      console.log(myMeal.strMeal);
      console.log(myMeal.strArea);

      console.log(myMeal.strInstructions);
      let count = 1;
      let ingredients = [];
      for (let i in myMeal) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myMeal[i]) {
          ingredient = myMeal[i];
          measure = myMeal[`strMeasure` + count];
          // strMeasure and count gets you the amount of ingredient needed
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
        // loop ends when there is no more strMeasure in the object.
      }
      console.log(ingredients);

      result.innerHTML = `
  <img src=${myMeal.strMealThumb}>
  <div class="details">
      <h2>${myMeal.strMeal}</h2>
      <h4>${myMeal.strArea}</h4>
  </div>
  <div id="ingredient-con"></div>
  <div id="recipe">
      <button id="hide-recipe">X</button>
      <pre id="instructions">${myMeal.strInstructions}</pre>
  </div>
  <button id="show-recipe">View Recipe</button>
  `;
      let ingredientCon = document.getElementById("ingredient-con");
      let parent = document.createElement("ul");
      let recipe = document.getElementById("recipe");
      let hideRecipe = document.getElementById("hide-recipe");
      let showRecipe = document.getElementById("show-recipe");

      ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
        ingredientCon.appendChild(parent);
      });

      hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
      });
      showRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
      });
    })
    .catch(() => {
      result.innerHTML = `<h3>Invalid Input</h3>`;
    });
}
