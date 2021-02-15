import styled from "styled-components";

import JokeContent from "../containers/JokeContent";
import JokeFooter from "../containers/JokeFooter";

const JokeContainer = styled.div`
  box-shadow: 5px 0 30px 0 rgba(0, 0, 0, 0.2);
  margin: auto;
  min-height: 300px;
  border-radius: 10px;
  margin: 10px;
  position: relative;
  flex-grow: 1;
`;

export default function Jokes() {
  return (
    <>
      <JokeContainer>
        <JokeContent />
      </JokeContainer>
      <JokeFooter />
    </>
  );
}
