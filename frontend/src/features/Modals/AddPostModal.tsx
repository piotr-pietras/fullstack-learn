import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Backend } from "../../services/backend";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../services/store";
import { selectIsAppLoading } from "../../services/selectors";
import { Category } from "../../app.slice";
import { PostAddActions, selectPostAdd } from "../PostBoard/post-add.store";

export const AddPostModal = () => {
  const [type, setType] = useState<string>(Category.all);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    request: { response },
  } = useAppSelector(selectPostAdd);
  const isLoading = useAppSelector(selectIsAppLoading);

  const dispatch = useDispatch();

  const onSubmit = () =>
    dispatch(
      PostAddActions.dataFetched(
        Backend.postAddPost({ content, title, type: type as Category })
      )
    );
  const onChange = (event: SelectChangeEvent<string>) =>
    setType(event.target.value);

  return (
    <div>
      <Title>Create Post</Title>
      <Description>
        Select type of post then insert title and content. When ready click
        submit.
      </Description>
      <FieldContainer>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={onChange}>
            {Object.keys(Category).map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FieldContainer>
      <FieldContainer>
        <TextField
          label="title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </FieldContainer>
      <FieldContainer>
        <TextField
          label="content"
          variant="outlined"
          value={content}
          fullWidth
          multiline
          rows={10}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
      </FieldContainer>
      {!response?.isSuccessful && <Error>{response?.reason}</Error>}
      <ButtonContainer>
        <LoadingButton
          variant="outlined"
          onClick={onSubmit}
          loading={isLoading}
        >
          submit
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
  width: 30rem;
  margin-bottom: 0.5rem;
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
