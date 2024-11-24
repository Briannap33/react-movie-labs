import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useQueries } from "react-query";
import { getMovie, getMovieRecommendations } from "../api/tmdb-api";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchList";
import MovieCard from "../components/movieCard";
import Spinner from '../components/spinner';
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper"

const WatchlistPage = () => {
    const { mustWatch: movieIds } = useContext(MoviesContext);

    const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => ({
            queryKey: ["movie", { id: movieId }],
            queryFn: getMovie,
        })),
    );
   
     const recommendationsQueries = useQueries(
       movieIds.map((movieId) => ({
           queryKey: ['recommendations', { id: movieId }],
           queryFn: () => getMovieRecommendations(movieId),
  
       }))
   );

const isLoading = watchlistMovieQueries.find((m) => m.isLoading === true);
const isRecommendationsLoading = recommendationsQueries.find((r) => r.isLoading === true);

if (isLoading || isRecommendationsLoading) {
    return <Spinner />;
}

const moviesWithRecommendations = watchlistMovieQueries
.filter((query) => query.data) // Remove undefined movies
.map((query, index) => ({
  ...query.data,
  recommendations: recommendationsQueries[index]?.data?.results || [],
}));

const toDo = () => true;

return (
  <PageTemplate
    title="Watchlist"
    movies={moviesWithRecommendations}
    action={(movie) => <RemoveFromWatchlist movie={movie} />}
  >
    <Grid container spacing={2} style={{ marginTop: "20px" }}>
      {moviesWithRecommendations.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          {/* Movie Card */}
          <MovieCard movie={movie} />

          {/* Recommended Movies */}
          {movie.recommendations.length > 0 && (
            <Paper style={{ marginTop: "20px", padding: "10px" }}>
              <Typography variant="h6" gutterBottom>
                Recommended Movies
              </Typography>
              <Grid container spacing={2}>
                {movie.recommendations.map((recommendedMovie) => (
                  <Grid item xs={12} sm={6} md={4} key={recommendedMovie.id}>
                    <MovieCard movie={recommendedMovie} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Grid>
      ))}
    </Grid>
  </PageTemplate>
);
};

export default WatchlistPage;