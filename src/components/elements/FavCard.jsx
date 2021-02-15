import { useDispatch } from "react-redux";
import styled from "styled-components";

import { AiFillDelete } from "react-icons/ai";
import { onFavDelete } from "../store/jokeSlice";

const FavJokeCard = styled.div`
  font-size: 1rem;
  padding: 10px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.15);
  margin: 10px;
  border-radius: 4px;
  background-color: white;
  position: relative;
`;

const DeleteIconHolder = styled.div`
  text-align: right;
  font-size: 1.2rem;
  height: 1.5rem;
`;

export default function FavCard({ data }) {
  const dispatch = useDispatch();

  function deleteClickHandler() {
    dispatch(onFavDelete(data.id));
  }

  return (
    <FavJokeCard>
      <div>{data.joke}</div>
      <DeleteIconHolder>
        <AiFillDelete onClick={deleteClickHandler} />
      </DeleteIconHolder>
    </FavJokeCard>
  );
}
