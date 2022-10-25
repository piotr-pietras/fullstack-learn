import {
  AppBar as AppBarMUI,
  styled,
  Avatar,
  Slide,
  useScrollTrigger,
  Button,
  IconButton as IconButtonMUI,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../services/store";
import { AppActions } from "../app.slice";
import { selectIsLogged } from "../login.store";
import { ModalList } from "./Modals/Modal";

export const AppBar = React.forwardRef<HTMLDivElement>((_, ref) => {
  const logged = useAppSelector(selectIsLogged);

  const dispatch = useAppDispatch();
  const { drawerOpened, modalOpened } = AppActions;

  const trigger = useScrollTrigger({
    target: window,
  });

  const onUserClick = () => {
    !logged &&
      dispatch(modalOpened({ isOpened: true, content: ModalList.register }));
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <Container ref={ref}>
          <IconButton
            onClick={() => {
              dispatch(drawerOpened(true));
            }}
          >
            <MenuIcon />
          </IconButton>
          <AppTitle>PostMe</AppTitle>
          <Button onClick={onUserClick}>
            {logged ? <Avatar /> : <Login>register me</Login>}
          </Button>
        </Container>
      </Slide>
    </>
  );
});

const Container = styled(AppBarMUI)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const IconButton = styled(IconButtonMUI)`
  color: white;
`;

const AppTitle = styled("div")`
  font-size: ${({ theme }) => theme.fontSize.XL};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Login = styled("div")`
  color: white;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
