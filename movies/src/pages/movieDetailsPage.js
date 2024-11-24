import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
// import useMovie from "../hooks/useMovie";   

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id }],
    getMovie
  );
  const { data: credits, isLoading: creditsLoading } = useQuery(
    ["credits", { id }],
    getMovieCredits
  );

  if (isLoading || creditsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movieWithCredits = { ...movie, credits };

  
  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movieWithCredits}>
            <MovieDetails movie={movieWithCredits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;