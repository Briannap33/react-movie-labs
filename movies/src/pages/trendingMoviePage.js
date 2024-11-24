import React, { useContext, useState } from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchList";
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchList";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ThumbsUpIcon from "@mui/icons-material/ThumbUp";
import ThumbsDownIcon from "@mui/icons-material/ThumbDown";
import { Typography
    
 } from "@mui/material";
const TrendingMoviePage = (props) => {

    const { data, error, isLoading, isError } = useQuery('trending', getTrendingMovies)
    const { addToMustWatch, removeFromMustWatch, mustWatch } = useContext(MoviesContext);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const { rateMovie, ratings } = useContext(MoviesContext);

    const handleAddToWatchlist = (movie) => {
        addToMustWatch(movie);
        setAlertMessage(`${movie.title} is added to your watchlist`);
        setAlertOpen(true);
    };

    const handleRemoveFromWatchlist = (movie) => {
        removeFromMustWatch(movie);
        setAlertMessage(`${movie.title} is removed from your watchlist`);
        setAlertOpen(true);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleRateMovie = (movie, isThumbsUp) => {
        rateMovie(movie, isThumbsUp);
      };

    if (isLoading) {
        return <Spinner />;
    }


    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;


    return (
        <>
            <PageTemplate
  title="Trending Movies"
  movies={movies}
  action={(movie) => (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {mustWatch.includes(movie.id) ? (
          <RemoveFromWatchlistIcon
            movie={movie}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        ) : (
          <AddToWatchlistIcon
            movie={movie}
            onAddToWatchList={handleAddToWatchlist}
          />
        )}
        <ThumbsUpIcon
          color={ratings[movie.id] === "thumbs-up" ? "primary" : "disabled"}
          onClick={() => handleRateMovie(movie, true)}
        />
        <ThumbsDownIcon
          color={ratings[movie.id] === "thumbs-down" ? "error" : "disabled"}
          onClick={() => handleRateMovie(movie, false)}
        />
     </div>
      {ratings[movie.id] && (
        <Typography variant="body2">
          Your Rating: {ratings[movie.id] === "thumbs-up" ? "👍" : "👎"}
        </Typography>
      )}
    </>
  )}
/>

            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

    export default TrendingMoviePage;