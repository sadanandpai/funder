import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { animated, useTrail } from "react-spring";
import { Button, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { FlexRowCenter, FlexColumnCenter } from "../styles";
import { setPage, invertBoolean } from "../store/jokeSlice";

const Label = styled.label`
  margin: 10px;
`;

const SplashScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 100%;
  background: linear-gradient(180deg, rgba(253, 41, 123, 1) 0%, rgba(255, 88, 100, 1) 100%);
  color: white;
`;

const AppNameHolder = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 3rem;
  color: white;
`;

const AppDescriptionHolder = styled.div`
  text-align: center;
  margin: 0;
  font-size: 1.2rem;
`;

const AppNameLetter = animated(
  styled.span`
    position: relative;
  `
);

const appName = "'Fun'der";
const description = "A tinder styled joke application";

export default function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [trail, setTrail] = useTrail(appName.length, () => ({
    left: 1500,
  }));

  useEffect(() => {
    setTimeout(() => {
      setTrail({
        left: 0,
      });
    }, 0);
  }, [setTrail]);

  function letsFunderClickHandler() {
    dispatch(setPage("JOKES"));
  }

  return (
    <SplashScreen>
      <AppNameHolder>
        {trail.map((props, i) => (
          <AppNameLetter key={i} style={props}>
            {appName.charAt(i)}
          </AppNameLetter>
        ))}
        <AppDescriptionHolder>{description}</AppDescriptionHolder>
        <FlexRowCenter>
          <Button type="primary" size="large" onClick={letsFunderClickHandler} style={{ margin: "10px" }}>
            Lets funder
          </Button>
        </FlexRowCenter>
      </AppNameHolder>
      <FlexColumnCenter>
        <FlexRowCenter>
          <Label>Display background images</Label>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={state.hasBackgroundImage}
            onClick={() => dispatch(invertBoolean("hasBackgroundImage"))}
          />
        </FlexRowCenter>
        <FlexRowCenter>
          <Label>Save liked jokes in browser</Label>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={state.hasLocalStorage}
            onClick={() => dispatch(invertBoolean("hasLocalStorage"))}
          />
        </FlexRowCenter>
      </FlexColumnCenter>
    </SplashScreen>
  );
}
