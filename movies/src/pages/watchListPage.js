import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchList";

const WatchlistPage = () => {
  const { mustWatch, RemoveFromMustWatch } = useContext(MoviesContext);

  const watchlistMovieQueries = useQueries(
    mustWatch.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  const isLoading = watchlistMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlistIcon
             movie={movie}
             onRemoveFromWatchlist={() => RemoveFromMustWatch(movie)} />
          </>
        );
      }}
    />
  );
};

export default WatchlistPage;