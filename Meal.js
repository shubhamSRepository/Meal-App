var mealSearchInput = document.getElementById('meal-search-input');
var searchTarget; // we will use this to 'var' to fetch text inside mealSearchInput given by user

var searchBtn = document.getElementById('searchBtn');

var suggestionsList = document.getElementById('suggestions-list');

var favMealsList = document.getElementById('favourite-meals-list');

var totalMeals = document.getElementById('total-number-of-meals');

//  AUTOMATIC SUGGESTION UPDATION FOR MEAL SEARCH INPUT BAR

// adding event listener to mealSearchInput (when user releases the pressed key)
mealSearchInput.addEventListener('keyup', function () {

    var mealRequest = new XMLHttpRequest; // creating a new XMLHttp request ;

    searchTarget = mealSearchInput.value;

    suggestionsList.innerHTML = ""; // setting suggestions list to empty 


    // applying 'ON-LOAD' method on XMLHttpRequest(mealRequest)
    mealRequest.onload = function () {

        // var 'listOfMeals' contains list of all meals matching string entered by user in 'mealSearchInput'
        var listOfMeals = JSON.parse(mealRequest.response); // fetching response of request and parsing json from it

        if (searchTarget.length) {

            for (let i = 0; i < listOfMeals.meals.length; i++) {

                let suggestion = listOfMeals.meals[i].strMeal;

                if (suggestion.toLowerCase().includes(searchTarget.toLowerCase())) {

                    // creating div using javascript for each suggestion of suggestions list
                    var divEachSuggestion = document.createElement('div');
                    divEachSuggestion.classList.add("divEachSuggestion-style");

                    divEachSuggestion.innerHTML = ` <div class="divSuggestionText" ><p>${suggestion}</p></div>
                                                    <div class="divFavBtn"><button class="favBtn"> + </button></div>`;

                    suggestionsList.appendChild(divEachSuggestion);

                    // here we are fetching text area of each suggestion from suggestions list and adding event listener on it
                    var divSuggestionText = divEachSuggestion.getElementsByClassName("divSuggestionText")[0];

                    divSuggestionText.addEventListener('click', function () {
                        detailsPage(suggestion);
                    });

                    // add event listener on search button
                    searchBtn.addEventListener('click', function () {
                        // this will show details of the top most suggestion in list
                        detailsPage(listOfMeals.meals[0].strMeal);
                    });


                    // here we are fetching 'favBtn' button from suggestions list and adding event listener on it
                    var favBtn = divEachSuggestion.querySelectorAll('.divFavBtn button')[0];

                    favBtn.addEventListener('click', function () {
                        addToFavList(suggestion);
                    });

                }

            }
        }


    }


    // applying 'OPEN' method on XMLHttpRequest(mealRequest)
    mealRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchTarget, true);


    // applying 'SEND' method on XMLHttpRequest(mealRequest)
    mealRequest.send();


});


function detailsPage(varNameInLS) {
    // this function will open meal details of meal clicked by user from suggestions list in a new page

    localStorage.setItem("suggestionClickedName", varNameInLS);
    
    // window.location.href='/index2.html'; // to open in same tab
    window.open("index2.html"); //to open in new tab

};


function addToFavList(suggestion) {
    // this function will add the suggestion into favourite list

    storeFavListToLS(suggestion);
    showFavList();
};


function storeFavListToLS(suggestion) {
    // this function will store favourite meals list to local storage

    if (localStorage.getItem("ListOfFavouriteMeals")) {

        var favList = localStorage.getItem("ListOfFavouriteMeals").split(',');

        for (let i = 0; i < favList.length; i++) {
            if (favList[i] === suggestion) {
                return;
            }
        }
        favList.push(suggestion);
        localStorage.setItem("ListOfFavouriteMeals", favList);
    }
    else {
        localStorage.setItem("ListOfFavouriteMeals", suggestion);
    }
};


function deleteFromFavList(index) {
    // this function will delete meal from suggestions list

    var favList = localStorage.getItem("ListOfFavouriteMeals").split(',');
    favList.splice(index, 1);
    localStorage.setItem("ListOfFavouriteMeals", favList);
    location.reload();
    showFavList();
};


function showFavList() {
    // this function is displaying the favourite list on screen

    favMealsList.innerHTML = '';
    var favList = localStorage.getItem("ListOfFavouriteMeals").split(',');
    if (favList.length === 0) {
        favMealsList.innerHTML = "Empty!";
        return;
    }

    for (let i = 0; i < favList.length; i++) {

        // creating div using javascript for each element of favourite list
        var divFavList = document.createElement('div');
        divFavList.classList.add("divFavList-style");
        divFavList.innerHTML = `<p>${i + 1}.&nbsp${favList[i]}</p>
                            <div><button class="RemoveFavListBtn-style" > - </button></div>`;
        favMealsList.appendChild(divFavList);
    }
    totalMeals.innerHTML = " Total Number of Meals = " + (favList.length);

    // location.reload();
};



if (localStorage.getItem("ListOfFavouriteMeals")) {
    // if local storage consists any "ListOfFavouriteMeals" only then showFavList will be executed in case page is refreshed or opened 

    showFavList();
}
else {
    // this will display "Empty" as text inside favList div when list is empty
    favMealsList.innerHTML = "Empty!";
}


// here we are fetching 'delete' button of favourite list elements and adding event listener on each of them using for each loop
var del = document.querySelectorAll('.RemoveFavListBtn-style');
del.forEach(function (element, index) {
    element.addEventListener('click', function () {
        location.reload();
        deleteFromFavList(index);
    });
});







