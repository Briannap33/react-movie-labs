import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { Link } from "react-router-dom";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const productionCountries = movie.production_countries || [];
  const movieCredits = movie.credits || { cast: [], crew: [] };


  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      {productionCountries.length > 0 && (
        <Paper component="ul" sx={{ ...root }}>
          <li>
            <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
          </li>
          {productionCountries.map((country, index) => (
            <li key={index}>
              <Chip label={country.name} sx={{ ...chip }} />
            </li>
          ))}
        </Paper>
      )}
      {/* Adding cast credits */}
      {/*checks if movie cres=dits and cast exist and have atleast 2 cast member*/}
      {movieCredits && movieCredits.cast && movieCredits.cast.length > 0 && (
        <Paper component="ul" sx={{ ...root }}>
          <li>
            <Chip label="Cast" sx={{ ...chip }} color="primary" />
          </li>
          {/*loops through cast array and displays each actor*/}
          {movieCredits.cast.map((actor) => (
            <li key={actor.id || actor.name}> 
                <Link to={`/person/${actor.id}`}>
              <Chip label={`${actor.name} - ${actor.character}`} sx={{ ...chip }} />
              </Link>
            </li>
          ))}
        </Paper>
      )}

      {/* Adding crew credits */}
      {movieCredits && movieCredits.crew && movieCredits.crew.length > 0 && (
        <Paper component="ul" sx={{ ...root }}>
          <li>
            <Chip label="Crew" sx={{ ...chip }} color="primary" />
          </li>
              {/* Loop through the crew array and display each crew member */}
          {movieCredits.crew.map((crewMem) => (
            <li key={crewMem.id || crewMem.name}> 
              <Chip label={`${crewMem.name} - ${crewMem.job}`} sx={{ ...chip }} />
            </li>
          ))}
        </Paper>
      )}


      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
