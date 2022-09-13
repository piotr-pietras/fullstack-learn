import {
  AppBar as AppBarMUI,
  styled,
  Avatar,
  Slide,
  useScrollTrigger,
  Button,
} from "@mui/material";
import React from "react";

export const AppBar = React.forwardRef<HTMLDivElement>((_, ref) => {
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Container ref={ref}>
        <div></div>
        <AppTitle>PostMe</AppTitle>
        <Button>
          <Avatar />
        </Button>
      </Container>
    </Slide>
  );
});

const Container = styled(AppBarMUI)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const AppTitle = styled("div")`
  font-size: ${({ theme }) => theme.fontSize.XL};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
