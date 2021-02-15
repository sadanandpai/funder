import styled from "styled-components";

export const FlexRowCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const FlexColumnCenter = styled(FlexRowCenter)`
  flex-direction: column;
`;
