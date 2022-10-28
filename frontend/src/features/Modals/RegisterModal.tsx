import { Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterActions } from "../../register.store";
import { Backend } from "../../services/backend";
// import { useAppSelector } from "../../services/store";
// import { selectIsAppLoading } from "../../services/selectors";

export const RegisterModal = () => {
  const [username, setUsername] = useState("");
  // const isLoading = useAppSelector(selectIsAppLoading);

  const dispatch = useDispatch();
  const onRegister = () => {
    dispatch(RegisterActions.dataFetched(Backend.postRegister(username)));
  };

  return (
    <div>
      <Title>Registration</Title>
      <Description>
        In order to register type your username and submit. After that you get
        auth token which will be stored in your browser
      </Description>
      <FieldContainer>
        <TextField
          label="username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </FieldContainer>
      <ButtonContainer>
        <Button variant="outlined" onClick={onRegister}>
          register
        </Button>
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
