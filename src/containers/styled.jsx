import styled from "styled-components";

export const Wrapper = styled("div")`
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  margin: 50px;
  background-color: ghostwhite;
  border-radius: 10px;
  padding: 20px;

  & > * {
    padding: 10px;
    flex: 1 100%;
  }
`;
