import { LinearProgress, styled } from "@mui/material";
import React, { useRef } from "react";
import { selectAppLoading } from "../app.store";
import { AppBar } from "../features/AppBar";
import { Navigator } from "../features/Navigator";
import { useAppSelector } from "../services/store";

interface Props {
  children: React.ReactNode | string;
}

const LOADING_PROGRESS_HEIGHT = 4;

export const MainLayout = ({ children }: Props) => {
  const appBar = useRef<HTMLDivElement>(null);
  const appBarHeight = appBar.current && appBar.current.clientHeight;
  const isLoading = useAppSelector(selectAppLoading);

  return (
    <>
      <LoadingContainer>
        {isLoading && (
          <LinearProgress sx={{ height: LOADING_PROGRESS_HEIGHT }} />
        )}
      </LoadingContainer>
      <AppBar ref={appBar} />
      <Container margin={appBarHeight}>
        <Body>
          <NavigatorContainer>
            <Navigator />
          </NavigatorContainer>
          <ChildrenContainer>{children}</ChildrenContainer>
        </Body>
      </Container>
    </>
  );
};

const Container = styled("div")<{ margin: number | null }>`
  margin-top: ${({ margin }) => margin && `${margin}px`};
  height: 100%;
`;

const LoadingContainer = styled("div")`
  position: sticky;
  top: 0;
  z-index: 2000;
  height: ${() => `${LOADING_PROGRESS_HEIGHT}px`};
`;

const Body = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`;

const NavigatorContainer = styled("div")``;

const ChildrenContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
`;
