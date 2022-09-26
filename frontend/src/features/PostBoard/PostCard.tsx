import { Avatar, Card, styled } from "@mui/material";
import { dateFormat, DateFormats } from "../../services/date";
import { Post } from "../../../../types/post.type";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <CardContainer>
      <Header>
        <Avatar />
        <HeaderText>
          <HeaderTitle>{post.title}</HeaderTitle>
          <HeaderDate>
            {dateFormat(post.created_on, DateFormats.DAY_LETTER_MONTH_TIME)}
          </HeaderDate>
        </HeaderText>
      </Header>
      <Body>
        {post.content.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </Body>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  width: 500px;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const Header = styled("div")`
  display: flex;
  align-items: center;
`;

const HeaderText = styled("div")`
  margin-left: 0.5rem;
`;

const HeaderTitle = styled("div")`
  font-size: ${({ theme }) => theme.fontSize.L};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const HeaderDate = styled("div")`
  font-size: ${({ theme }) => theme.fontSize.S};
`;

const Body = styled("div")`
  margin: 0.5rem;
`;
