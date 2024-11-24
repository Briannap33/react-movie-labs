# Assignment 1 - ReactJS app.

Name: Brianna Power

## Overview.

In this repository you will find the movies app, this contains a data base of movies, each category can be found in a different tab, users can add/remove to their favourites or add/remove to their watchlist based on what page they are currently viewing, users can filter through the movies or even search. when looking at a movies users can now find the actor, crew, production country, genre and more, the cast bubbles are clickable which will then lead the user to a page dedicated to the actors details, this also shows the movies which they have starred in which the user can click on to get more details

### Features.

+ Now Trending page (with pagination, movies are only for view, connot click in for more info)
+ Popular movies page
+ must watch list
+ snackbar when movie is added or removed from watch list
+ cast and crew credits for each movie
+ when a cast member is clicked, links to their own actor page
+ when a movie on actor page is clicked, the movie information comes up

## Setup requirements.

@mui/icons-material
@mui/material

## API endpoints.

+ Trending(day) list of movies - /trending/movie/day
+ lists off popular movies based on attention or being well known- /movie/popular
+ actor details(biography, image and other data)- /person/:id
+ retrieves the movies an actor has been in - /person/:id/movie_credits

## Routing.

+ /person/:id- actorDetailPage
+ /trending - nowTrendingMovies
+ /popular - popularMoviesPage
+ /watchlist - watchListPage

## Independent learning (If relevant).

https://mui.com/material-ui/api/
