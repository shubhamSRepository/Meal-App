// we have transfered name of suggestion clicked from "Meal.js" using local storage and 
// stored it in a new var 'suggestionsClickedName' in "MealDetails.js"
var suggestionClickedName = localStorage.getItem("suggestionClickedName");


// setting heading on page 'MealDetails' with name of suggestion clicked by user
var mealDetailsHeading = document.getElementById("meal-detail-heading").querySelector("h1");
mealDetailsHeading.innerText = suggestionClickedName;


// creating a new 'XMLHttpRequest' to fetch an object containing all meals starting with string[0] of 'suggestionClickedName'
var mealDetailsRequest = new XMLHttpRequest;


// applying 'ON-LOAD' method on XMLHttpRequest(mealDetailsRequest)
mealDetailsRequest.onload = function () {


    // storing response(an array of objects) of 'mealDtailsRequest' and parsing JSON 
    var mealsListByFirstAlpha = JSON.parse(mealDetailsRequest.response).meals;

    var suggestionClickedDetails; //to store object of meal whose details user has asked for



    // iterating over array 'mealsListByFistAlpha' to find object containing details of meal user has asked for
    for (let i = 0; i < mealsListByFirstAlpha.length; i++) {
        if (mealsListByFirstAlpha[i].strMeal === suggestionClickedName) {
            suggestionClickedDetails = mealsListByFirstAlpha[i];
            // console.log(suggestionClickedDetails);
        }

    }



    // image of meal(asked by user) 
    var MealImage = document.getElementById("image").querySelector("img");
    MealImage.src = suggestionClickedDetails.strMealThumb;
    MealImage.alt = "Meal Image";



    //  category of meal(asked by user)
    var MealCategory = document.getElementById("category").querySelector("p");
    MealCategory.innerText = suggestionClickedDetails.strCategory;



    // area of meal(asked by user)
    var MealArea = document.getElementById("area").querySelector("p");
    MealArea.innerText = suggestionClickedDetails.strArea;



    // ingredients and their measurements of meal(asked by user)

    // here we are storing keys of 'suggestionClickedDetails' object in an array, so that we can iterate over 
    // this array and can pick up keys which contains ingredients or measurements of meal 
    var arrayMealDetails = Object.entries(suggestionClickedDetails);

    var arrayMealIngredients = []; // to store all 'key-value' pairs whose value is not null or empty
    for (let i = 0; i < arrayMealDetails.length; i++) {

        if (arrayMealDetails[i][0].includes("strIngredient") && arrayMealDetails[i][1] != "" && arrayMealDetails[i][1] != null) {

            arrayMealIngredients.push(arrayMealDetails[i][1]);
        }
    }

    var arrayMealMeasurements = []; // to store all 'key-value' pairs whose value is not null or empty
    for (let i = 0; i < arrayMealDetails.length; i++) {

        if (arrayMealDetails[i][0].includes("strMeasure") && arrayMealDetails[i][1] != "" && arrayMealDetails[i][1] != null && arrayMealDetails[i][1] != " ") {

            arrayMealMeasurements.push(arrayMealDetails[i][1]);
        }
    }

    var MealIngredientsAndMeasurements = document.getElementById("div-ingredients-and-measurements").querySelector("p");
    for (let i = 0,j=1; i < arrayMealMeasurements.length; i++,j++) {

        // "\u00A0" helps in spacing while we use '.innerText'
        MealIngredientsAndMeasurements.innerText = MealIngredientsAndMeasurements.innerText + (j) + "." + "\u00A0" + arrayMealIngredients[i] + "\u00A0" + "\u00A0" + "(" + arrayMealMeasurements[i] + ")" + "\n";
    }



    // instructions for meal(asked by user)
    var MealInstructions = document.getElementById("instructions").querySelector("p");
    MealInstructions.innerText = suggestionClickedDetails.strInstructions;

};



// applying 'OPEN' method on XMLHttpRequest(mealDetailsRequest)
mealDetailsRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + suggestionClickedName[0], true);



// applying 'SEND' method on XMLHttpRequest(mealDetailsRequest)
mealDetailsRequest.send();