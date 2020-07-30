
## Flicks DB, WIP

**App works thanks to the https://www.themoviedb.org/ API.**

The plan is to make the app as close functional as the original.
At the end I will probably add simple login system to make
watchlists, add favourites, rate entries (and maybe more if something comes to mind)

## About
- App created to mimic some functionality of movie Databases that are found on the web
- Frontend build with react 
- React-redux with redux-saga for state management
- Used heroku for backend(API calls, all passport logic)

## Features

- Discover function - discover new movies / tv shows filtered by year, genre, keywords and sort them however you want
- Movies / TV Shows / People - show entries sorted by popular, top, upcoming (on the air for tv shows)  and now playing (airing today for tv shows), people are sorted by popular by default
- Searchbar - search and displays results from given input, results are split into categories(movies, tv shows and people)
- Details page - every entry has its own details page where you can find most of the information about the entry given by the API
- User login/register system - used passport with local strategy for this project, passwords are encrypted and kept hashed in the database(MongoDB), if you want to see what the user page looks like right away without creating an account yourself login to demo account specified in the login page
- User features after logging in: 
	- Rate, review, add to watchlist - every movie and tv show can be rated, reviewed or added to watchlist on entry details page, it is not possible to use these features on demo account and you cannot add a record twice for the same entry (like rating twice the same movie)
	- Account page - after you are logged in you can check all your data on the account page, all data is separated into different categories for easier understanding of the data, you can also change your password 


