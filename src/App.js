import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useBeforeunload } from "react-beforeunload";

import { setStateFromLocalStorage, fetchJokeAsync } from "./components/store/jokeSlice";
import { jokesAPIPageNumber } from "./components/store/apiReq";

import Home from "./components/pages/Home";
import Jokes from "./components/pages/Jokes";
import Favorite from "./components/pages/Favorite";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
  background: linear-gradient(180deg, rgba(253, 41, 123, 1) 0%, rgba(255, 88, 100, 1) 100%);
  display: flex;
  flex-direction: column;
`;

export default function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useBeforeunload(() => {
    localStorage.setItem("jokes", JSON.stringify(state.jokes));
    localStorage.setItem("hasBackgroundImage", state.hasBackgroundImage);
    localStorage.setItem("hasLocalStorage", state.hasLocalStorage);
    localStorage.setItem("jokesAPIPageNumber", jokesAPIPageNumber);

    if (state.hasLocalStorage) {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  });

  useEffect(() => {
    if (localStorage.getItem("jokes")) {
      dispatch(
        setStateFromLocalStorage({
          jokes: JSON.parse(localStorage.getItem("jokes")),
          favorites: JSON.parse(localStorage.getItem("favorites")),
          hasBackgroundImage: JSON.parse(localStorage.getItem("hasBackgroundImage")),
          hasLocalStorage: JSON.parse(localStorage.getItem("hasLocalStorage")),
          jokesAPIPageNumber: JSON.parse(localStorage.getItem("jokesAPIPageNumber")),
        })
      );
    }
  }, []);

  useEffect(() => {
    dispatch(fetchJokeAsync());
  }, [state.jokes, dispatch]);

  function getPage() {
    switch (state.page) {
      case "HOME":
        return <Home />;
      case "JOKES":
        return <Jokes />;
      case "FAVORITE":
        return <Favorite />;
      default:
        return <Home />;
    }
  }

  return <Container>{getPage()}</Container>;
}
