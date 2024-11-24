import React, { useContext } from "react";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchList";
import MovieCard from "../components/movieCard";
import Spinner from '../components/spinner';
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import Grid from "@mui/material/Grid2";

const WatchlistPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  // Fetch movie details using useQueries
  const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    }))
  );

  // Check if any query is still loading
  const isLoading = watchlistMovieQueries.some((query) => query.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  // Filter and map the movies data
  const movies = watchlistMovieQueries
    .filter((query) => query.data)
    .map((query) => query.data);

  return (
    <PageTemplate
      title="Watchlist"
      movies={movies}
      action={(movie) => <RemoveFromWatchlist movie={movie} />}
    >
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            {/* Movie Card */}
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </PageTemplate>
  );
};

export default WatchlistPage;
