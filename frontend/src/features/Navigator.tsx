import { Button as ButtonMUI, styled, TextField } from "@mui/material";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import { useAppDispatch, useAppSelector } from "../services/store";
import {
  AppActions,
  Category,
  selectChosenCategory,
  selectSearchValue,
} from "../app.slice";

const categories = Object.values(Category);

const getIcon = (category: keyof typeof Category) => {
  switch (category) {
    case Category.all:
      return <SelectAllIcon fontSize="inherit" />;
    case Category.sport:
      return <SportsBasketballIcon fontSize="inherit" />;
    case Category.fun:
      return <EmojiEmotionsIcon fontSize="inherit" />;
    case Category.news:
      return <PodcastsIcon fontSize="inherit" />;
    default:
      return <></>;
  }
};

export const Navigator = () => {
  const dispatch = useAppDispatch();
  const { categorySelected, searchInputUpdated } = AppActions;

  const selected = useAppSelector(selectChosenCategory);
  const searchValue = useAppSelector(selectSearchValue);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(searchInputUpdated(e.currentTarget.value));

  return (
    <Container>
      <Search
        label="Search by title"
        variant="outlined"
        value={searchValue}
        onChange={onChangeSearch}
      />
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => dispatch(categorySelected(category))}
          variant={category === selected ? "contained" : "text"}
          selected={category === selected}
        >
          {getIcon(category)}
          <Text>{category}</Text>
        </Button>
      ))}
    </Container>
  );
};

const Container = styled("div")`
  height: 100%;
  width: 100%;
  padding-top: 1rem;
  min-width: 250px;
  display: flex;
  flex-direction: column;
`;

const Search = styled(TextField)`
  margin: 0.5rem;
`;

const Button = styled(ButtonMUI)<{ selected: boolean }>`
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 3rem;
  opacity: ${({ selected }) => !selected && 0.7};
  color: ${({ selected, theme }) => !selected && theme.colors.grey};
`;

const Text = styled("span")`
  margin-left: 1.5rem;
  font-size: 1rem;
`;
