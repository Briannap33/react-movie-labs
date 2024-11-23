import React, { useContext, useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchList";
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchList";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const UpcomingMoviesPage = (props) => {

    const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)
    const { addToMustWatch, removeFromMustWatch, mustWatch } = useContext(MoviesContext);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

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
                title="Upcoming Movies"
                movies={movies}
                action={(movie) => (
                    <>
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

    export default UpcomingMoviesPage;