import React, { useEffect, useState, useRef } from "react";
import randomcolor from "randomcolor";
import styled from "styled-components";

import { images } from "../store/jokeSlice";
import { fetchImage } from "../store/apiReq";

const BackgroundColorCard = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  text-shadow: 2px 2px 4px black;
  background: linear-gradient(180deg, ${(props) => props.color1} 0%, ${(props) => props.color2} 100%);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  -webkit-user-drag: none;
`;

export default React.memo(function ImageCard({ hasBackgroundImage }) {
  const isComponentUnmounted = useRef(false);
  const [src, setSrc] = useState("");

  useEffect(() => {
    let image;
    async function getImage() {
      image = images.pop() ?? (await fetchImage());
      if (image && !isComponentUnmounted.current) {
        setSrc(image.url);
      } else if (image) {
        images.push(image);
      }
    }

    if (hasBackgroundImage) {
      isComponentUnmounted.current = false;
      getImage();
    }

    return () => {
      isComponentUnmounted.current = true;
      images.push(image);
    };
  }, [hasBackgroundImage]);

  return (
    <BackgroundColorCard color1={randomcolor()} color2={randomcolor()}>
      {src && <Image src={src} alt="random background for joke" />}
    </BackgroundColorCard>
  );
});
