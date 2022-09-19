import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import AddProd from "./component/AddProd_form";
import Axios from "axios";

import cors from "cors";

import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
const API_URL = "http://www.omdbapi.com?apikey=92dbbf7c";

const API = Axios.create({ baseURL: 'http://localhost:3001'});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [component, setcomponent] = useState(false);
  const [prod, setProd] = useState();

  // const searchMovies = async (title) => {
  //   const response = await fetch(`${API_URL}&s=${title}`);
  //   const data = await response.json();

  //   setMovies(data.Search);
  // };

  useEffect(() => {
    API.get("/getUsers")
      .then((resp) => {
        setProd(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="app">
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setcomponent(true)}
        >
          Admin panel
        </Button>
      </div>
      <h1>Moviesland</h1>

      {/* {!component ? (
        <div className="search">
          <input
            type="text"
            value={searchTerm}
            placeholder="Movie name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() =>
              searchTerm?.length > 0
                ? searchMovies(searchTerm)
                : alert("Empty Search Field")
            }
          />
        </div>
      ) : (
        <p></p>
      )} */}
      {!component ? (
        prod?.length > 0 ? (
          <div className="container">
            {prod.map((product) => {
              return <MovieCard product={product} />;
            })}
          </div>
        ) : (
          <div className="empty">
            <h2>Movies not found</h2>
          </div>
        )
      ) : (
        <div className="empty">
          <AddProd />
        </div>
      )}
      {console.log(prod?.length)}
      <p>hy</p>
    </div>
  );
};

export default App;
