import { useSelector, useDispatch } from "react-redux";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import { Button } from "antd";

import { fetchJokeAsync } from "../store/jokeSlice";
import { FlexColumnCenter } from "../styles";
import JokeCard from "../elements/JokeCard";

const AnimatedSwipeCard = animated(JokeCard);
const OfflineMessageHolder = styled(FlexColumnCenter)`
  height: 100%;
  font-size: 2rem;
  color: white;
  font-weight: 600;
`;

export default function JokeContent() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  function retryHandler() {
    dispatch(fetchJokeAsync());
  }

  const transitions = useTransition(state.jokes.slice(0, 2), (card) => card?.id, {
    from: { opacity: "1" },
    leave: { opacity: "0" },
  });

  return (
    <>
      {transitions.length === 0 ? (
        <OfflineMessageHolder>
          Check your internet connectivity
          <Button type="primary" size="large" onClick={retryHandler}>
            Retry
          </Button>
        </OfflineMessageHolder>
      ) : (
        transitions.reverse().map(({ item, props, key }) => <AnimatedSwipeCard key={key} id={item.id} styles={props} jokeText={item?.joke} />)
      )}
    </>
  );
}
