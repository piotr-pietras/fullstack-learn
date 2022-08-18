import { styled } from "@mui/material";
import { Navigator } from "../features/Navigator";

interface Props {
  children: React.ReactNode | string;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <Container>
      <Header>header</Header>
      <Body>
        <NavigatorContainer>
          <Navigator />
        </NavigatorContainer>
        <ChildrenContainer>{children}</ChildrenContainer>
      </Body>
    </Container>
  );
};

const Container = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled("div")`
  width: 100%;
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
`;
