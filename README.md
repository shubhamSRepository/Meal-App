
# ***Meal App*** :yum: 
This is a front-end project, a 'Meal App' that helps the user to find their favourite meals from a huge variety of meals.


## Features

### 1. Search Bar
The 'Search Bar' offers users a dynamic search. With every letter they add to the text of the 'Search Bar' the list will modify its suggestions list for the convenience of the user.

### 2. Meal Details Page
It contains a separate 'Meal Details' page that contains all the details of the meal user have selected like the origin of the meal, ingredients, etc.

### 3. Favourite Meals List
It also allows user to save their favourite meals in a list called 'Your Favourite Meals'. Users can add or delete meals at their convenience. The 'Your Favourite Meals' remain even after the page reloads or reopening of the app.


## Built With and Working
We have used HTML, CSS, BOOTSTRAP and Vanilla JavaScript to build this project. 'Meal App' uses an API 'The MealDB' (https://www.themealdb.com/api.php), which is a free API to be used for educational purposes. The JavaScript code fetches meals searched by the user from this API and provides results to the user. The 'Meal Details' page and 'Your Favourite Meal' will use the local storage of the user to store data for the proper functioning of the app.


## Demo
https://user-images.githubusercontent.com/112337370/228192498-93ace036-97f4-403c-8f1f-d5e2154b6be0.mp4

## Bug-Report
This project contains a backend bug. As this is a frontend project and data is fetched from an API, It is technically not a frontend bug. 
### Bug details
The bug occurs when we add a new meal to the 'Your Favourite Meal' list. It requires a reload of the page only after that you can use the delete button available 
in div of elements inside the 'Your Favourite Meal' list.

