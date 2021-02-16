import styled from "styled-components";
import { useDrag } from "react-use-gesture";
import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaHeart } from "react-icons/fa";
import { setSwipeDirection, onSwipe } from "../store/jokeSlice";
import { FlexColumnCenter } from "../styles";
import ImageCard from "./ImageCard";

const MainCard = styled(FlexColumnCenter)`
  margin: 10px 5px;
  padding: 10px;
  box-shadow: 5px 0 40px 0 rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  margin: auto;
  user-select: none;
  touch-action: none;
  border-radius: 10px;
  overflow: hidden;
`;

const JokeText = styled.div`
  color: white;
  font-weight: bold;
  font-size: 2rem;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: black;
  text-align: center;
  max-height: 100%;
  position: absolute;
  padding: 10px;
  text-shadow: 2px 2px 4px black;
  touch-action: pan-y;
  overflow: auto;

  &&::-webkit-scrollbar {
    display: none;
  }
`;

const SwipeText = styled.div`
  color: ${(props) => (props.direction === "LEFT" ? "red" : "lightgreen")};
  border: 6px solid currentColor;
  font-size: 3rem;
  transform: rotate(-30deg);
  font-weight: 600;
  background: rgba(0, 0, 0, 0.25);
  padding: 0 15px;
`;

const LikeIconHolder = styled(FaHeart)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 2rem;
  z-index: 1;
  color: red;
  stroke: #fff;
  stroke-width: 1rem;
`;

function getSwipeStatus(directionSign, movementX) {
  const angle = movementX / 10;
  if (directionSign === -1 || angle < -25) {
    return "LEFT";
  } else if (directionSign === 1 || angle > 25) {
    return "RIGHT";
  }
  return "";
}

function getDirection(movementX) {
  if (movementX < -30) {
    return "LEFT";
  } else if (movementX > 30) {
    return "RIGHT";
  }

  return "";
}

const AnimatedCard = animated(MainCard);

export default function JokeCard({ jokeText, styles, id }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [direction, setDirection] = useState("");

  const [{ movementX }, setSpring] = useSpring(() => ({
    movementX: 0,
  }));

  // Functionality implements drag behavior of the card
  const bind = useDrag(
    ({ down, swipe: [direction], movement: [movementX] }) => {
      setSpring({ movementX });
      setDirection(getDirection(movementX));

      // Perform actions when mouse up or touch completion
      if (!down) {
        const swipeStatus = getSwipeStatus(direction, movementX);
        if (swipeStatus) {
          movementX = swipeStatus === "LEFT" ? movementX - 100 : movementX + 100;
          dispatch(setSwipeDirection(swipeStatus));
        } else {
          movementX = 0;
          setDirection(swipeStatus);
        }

        setSpring({ movementX });
      }
    },
    // Allow swipe and drag only on x axis
    { axis: "x" }
  );

  useEffect(() => {
    // Emulate the swipe like behavior when user click on like or dislike button on only top card
    if (id === state.jokes[0]?.id && state.swipeDirection) {
      setDirection(state.swipeDirection);
      setSpring({ movementX: state.swipeDirection === "LEFT" ? -250 : 250 });
      dispatch(onSwipe(id));
    }
  }, [state.swipeDirection, dispatch, setSpring, id, state.jokes]);

  return (
    <AnimatedCard
      {...bind()}
      style={{
        ...styles,
        transform: movementX.interpolate((value) => `translate(${value}px, ${Math.abs(value) / 10}px) rotate(${value / 10}deg)`),
      }}
    >
      <ImageCard hasBackgroundImage={state.hasBackgroundImage} />
      <JokeText>{jokeText}</JokeText>
      {state.favorites.findIndex((item) => item.id === id) !== -1 && <LikeIconHolder />}
      {direction === "LEFT" && <SwipeText direction={direction}>NOPE</SwipeText>}
      {direction === "RIGHT" && <SwipeText direction={direction}>LIKE</SwipeText>}
    </AnimatedCard>
  );
}
