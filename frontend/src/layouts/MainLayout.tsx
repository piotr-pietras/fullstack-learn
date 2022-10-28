import { Drawer, LinearProgress, styled } from "@mui/material";
import React, { useRef } from "react";
import {
  AppActions,
  selectAppIsDrawerOpened,
} from "../app.slice";
import { AppBar } from "../features/AppBar";
import { selectIsAppLoading } from "../services/selectors";
import { useAppDispatch, useAppSelector } from "../services/store";

interface Props {
  children: React.ReactNode | string;
  drawerChildren: React.ReactNode;
}

const LOADING_PROGRESS_HEIGHT = 4;

export const MainLayout = ({ children, drawerChildren }: Props) => {
  const dispatch = useAppDispatch();
  const { drawerOpened } = AppActions;

  const appBar = useRef<HTMLDivElement>(null);
  const appBarHeight = appBar.current && appBar.current.clientHeight;
  const isLoading = useAppSelector(selectIsAppLoading);
  const isOpened = useAppSelector(selectAppIsDrawerOpened);

  return (
    <>
      <LoadingContainer>
        {isLoading && (
          <LinearProgress sx={{ height: LOADING_PROGRESS_HEIGHT }} />
        )}
      </LoadingContainer>
      <AppBar ref={appBar} />
      <Drawer open={isOpened} onClose={() => dispatch(drawerOpened(false))}>
        {drawerChildren}
      </Drawer>
      <Container margin={appBarHeight}>
        <Body>{children}</Body>
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
