import { Button as ButtonMUI, styled } from "@mui/material";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import { useAppDispatch, useAppSelector } from "../services/store";
import {
  AppActions,
  Category,
  selectAllCategories,
  selectChosenCategory,
} from "../stores/app.store";

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
  const { categorySelected } = AppActions;
  const selected = useAppSelector(selectChosenCategory);
  const categories = useAppSelector(selectAllCategories);

  return (
    <Container>
      {categories.map((category) => (
        <Button
          onClick={() => dispatch(categorySelected(category))}
          variant={category === selected ? "contained" : "outlined"}
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
  display: flex;
  flex-direction: column;
`;

const Button = styled(ButtonMUI)`
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 3rem;
`;

const Text = styled("span")`
  margin-left: 1.5rem;
  font-size: 1rem;
`;
