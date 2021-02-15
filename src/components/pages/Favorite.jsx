import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "antd";

import { setPage } from "../store/jokeSlice";
import FavCard from "../elements/FavCard";
import { FlexRowCenter, FlexColumnCenter } from "../styles";

const FavoriteMenu = styled(FlexRowCenter)`
  background-color: #fd2c7a;
  position: sticky;
  padding: 10px;
  top: 0;
  z-index: 1;
`;

const FavoriteContainer = styled.div`
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoFavoriteMessage = styled(FlexColumnCenter)`
  height: 100%;
  font-size: 2rem;
  color: white;
  font-weight: 600;
  padding: 10px;
`;

export default function Favorite() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  function clickHandler(page) {
    dispatch(setPage(page));
  }

  return (
    <FavoriteContainer>
      <FavoriteMenu>
        <Button type="primary" size="large" onClick={() => clickHandler("HOME")} style={{ margin: "0 10px" }}>
          Home
        </Button>
        <Button type="primary" size="large" onClick={() => clickHandler("JOKES")}>
          Jokes
        </Button>
      </FavoriteMenu>
      {state.favorites.length === 0 ? (
        <NoFavoriteMessage>You have not liked any jokes yet</NoFavoriteMessage>
      ) : (
        state.favorites.map((card) => <FavCard key={card?.id} data={card} />)
      )}
    </FavoriteContainer>
  );
}
