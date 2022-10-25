import { Button, styled, TextField } from "@mui/material";

export const RegisterModal = () => {
  return (
    <div>
      <Title>Registration</Title>
      <Description>
        In order to register type your username and submit. After that you get
        auth token which will be stored in your browser
      </Description>
      <FieldContainer>
        <TextField label="username" variant="filled" />
      </FieldContainer>
      <ButtonContainer>
        <Button variant="outlined">register</Button>
      </ButtonContainer>
    </div>
  );
};

const Title = styled("div")`
  margin-bottom: 1rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.XL};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Description = styled("div")`\
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSize.M};
`;

const FieldContainer = styled("div")`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled("div")`
  display: flex;
  justify-content: end;
`;
