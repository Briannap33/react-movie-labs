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

const movies = watchlistMovieQueries.map((q, index) => {
    return {
        ...q.data,
        recommendations: recommendationsQueries[index]?.data?.results || [],

    }
});

const toDo = () => true;

    return (
        <PageTemplate title="Watchlist"
            movies={movies}
            action={(movie) =>
                <RemoveFromWatchlist movie={movie} />}>
               <div style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Recommended Movies
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {movies.map((movie) =>
            movie.recommendations.length > 0 ? (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Typography variant="h6" gutterBottom>
                  {movie.title}
                </Typography>
                <div style={{ display: "flex", overflowX: "auto" }}>
                  {movie.recommendations.map((recommendedMovie) => (
                    <div key={recommendedMovie.id} style={{ marginRight: "10px" }}>
                      <MovieCard movie={recommendedMovie} />
                    </div>
                  ))}
                </div>
              </Grid>
            ) : null
          )}
        </Grid>
      </div>
    </PageTemplate>
  );
};

export default WatchlistPage;