import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

const ActorPage = () => {
    const { id } = useParams();
    const { data: actor, error, isLoading: isActorLoading, isError } = useQuery(
      ["actor", { id }],
      getActorDetails
    );

    const { data: movieCredits, isLoading: isCreditsLoading } = useQuery(
      ["actorMovieCredits", { id }],
      getActorMovieCredits
    );
  
    if (isActorLoading || isCreditsLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>;
    }
    /** actor Details **/
    const renderActorDetails = () => (
        <>
          <h2>{actor.name}</h2>
          {actor.biography ? <p>{actor.biography}</p> : <p>No biography available.</p>}
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
              alt={`${actor.name}`}
            />
          )}
        </>
      );

      /**Actor Movies */
      const renderMovieCredits = () => (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <h3>Movies</h3>
          {movieCredits.cast && movieCredits.cast.length > 0 ? (
            movieCredits.cast.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: "none" }}>
                <Chip label={movie.title} sx={{ margin: "0.5em" }} />
              </Link>
            ))
          ) : (
            <p>No movies available for this actor.</p>
          )}
        </Paper>
      );
    
      return (
        <div>
          {renderActorDetails()}
          {renderMovieCredits()}
        </div>
      );
    };
    
    export default ActorPage;

  