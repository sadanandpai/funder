import { useState, useEffect, useCallback } from "react";
import { animated, useSpring } from "react-spring";
import { throttle } from "lodash";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { setPage, setSwipeDirection } from "../store/jokeSlice";

import { MdClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiListCheck } from "react-icons/bi";

const FooterContainer = styled.div`
  display: flex;
  margin: 10px 0;
  height: 80px;
  justify-content: center;
`;

const ButtonHolder = styled.div`
  border-radius: 50%;
  background-color: white;
  border: 8px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  margin: 0 -4px;
  height: ${(props) => (props.large ? "80px" : "60px")};
  width: ${(props) => (props.large ? "80px" : "60px")};
  font-size: ${(props) => (props.large ? "2rem" : "1.5rem")};
`;

const AnimatedMdClose = animated(MdClose);
const AnimatedFaHeart = animated(FaHeart);

export default function JokeFooter() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [leftToggle, setLeftToggle] = useState(false);
  const [rightToggle, setRightToggle] = useState(false);

  const rejectProps = useSpring({ scale: leftToggle ? 0 : 1, config: { duration: 1000 } });
  const acceptProps = useSpring({ scale: rightToggle ? 0 : 1, config: { duration: 1000 } });

  useEffect(() => {
    if (state.swipeDirection === "LEFT") {
      setLeftToggle((toggle) => !toggle);
    } else if (state.swipeDirection === "RIGHT") {
      setRightToggle((toggle) => !toggle);
    }
  }, [state.swipeDirection]);

  const clickHandler = useCallback(
    throttle(
      (event) => {
        const type = event.target.closest("[data-type]").dataset.type;
        if (type === "HOME") {
          dispatch(setPage("HOME"));
        } else if (type === "FAVORITE") {
          dispatch(setPage("FAVORITE"));
        } else if (type === "REJECT") {
          dispatch(setSwipeDirection("LEFT"));
        } else if (type === "ACCEPT") {
          dispatch(setSwipeDirection("RIGHT"));
        }
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  return (
    <FooterContainer onClick={clickHandler}>
      <ButtonHolder data-type="HOME" color="orange">
        <AiFillHome />
      </ButtonHolder>
      <ButtonHolder data-type="REJECT" color="red" large>
        <AnimatedMdClose
          style={{
            transform: rejectProps.scale
              .interpolate({
                range: [0, 0.25, 0.5, 0.75, 1],
                output: [1, 1.5, 1, 1.5, 1],
              })
              .interpolate((x) => `scale(${x})`),
          }}
        />
      </ButtonHolder>
      <ButtonHolder data-type="ACCEPT" color="green" large>
        <AnimatedFaHeart
          style={{
            transform: acceptProps.scale
              .interpolate({
                range: [0, 0.25, 0.5, 0.75, 1],
                output: [1, 1.5, 1, 1.5, 1],
              })
              .interpolate((x) => `scale(${x})`),
          }}
        />
      </ButtonHolder>
      <ButtonHolder data-type="FAVORITE" color="blue">
        <BiListCheck />
      </ButtonHolder>
    </FooterContainer>
  );
}
