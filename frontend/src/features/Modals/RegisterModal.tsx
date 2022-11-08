import { styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterActions, selectRegister } from "../../register.store";
import { Backend } from "../../services/backend";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../services/store";
import { selectIsAppLoading } from "../../services/selectors";
import { selectIsLogged } from "../../login.store";
import { AppActions } from "../../app.slice";

export const RegisterModal = () => {
  const [username, setUsername] = useState("");
  const {
    request: { response },
  } = useAppSelector(selectRegister);
  const isLoading = useAppSelector(selectIsAppLoading);
  const isLogged = useAppSelector(selectIsLogged);

  const dispatch = useDispatch();
  const { modalOpened } = AppActions;
  const onRegister = () => {
    dispatch(RegisterActions.dataFetched(Backend.postRegister(username)));
  };

  useEffect(() => {
    if (isLogged) dispatch(modalOpened({ isOpened: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return (
    <div>
      <Title>Registration</Title>
      <Description>
        In order to register type your username and submit. After that you get
        auth token which will be stored in your browser. If you want to log out
        just delete token from storage.
      </Description>
      <FieldContainer>
        <TextField
          label="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </FieldContainer>
      {!response?.isSuccessful && <Error>{response?.reason}</Error>}
      <ButtonContainer>
        <LoadingButton
          variant="outlined"
          onClick={onRegister}
          loading={isLoading}
        >
          register
        </LoadingButton>
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

const Description = styled("div")`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSize.M};
`;

const FieldContainer = styled("div")`
  margin-bottom: 0.25rem;
`;

const ButtonContainer = styled("div")`
  display: flex;
  justify-content: end;
`;

const Error = styled("div")`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSize.S};
  color: red;
`;
