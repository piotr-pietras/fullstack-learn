import { Card, Modal as ModalMUI, styled } from "@mui/material";
import {
  AppActions,
  selectIsModalOpened,
  selectModalContent,
} from "../../app.slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { AddPostModal } from "./AddPostModal";
import { RegisterModal } from "./RegisterModal";

export enum ModalList {
  register = "register",
  addPost = "addPost",
}

const getModal = (modal: ModalList) => {
  if (modal === ModalList.register) return <RegisterModal />;
  if (modal === ModalList.addPost) return <AddPostModal />;
};

export const Modal = () => {
  const isOpened = useAppSelector(selectIsModalOpened);
  const modal = useAppSelector(selectModalContent);

  const dispatch = useAppDispatch();
  const { modalOpened } = AppActions;

  const onClose = () => {
    dispatch(modalOpened({ isOpened: false }));
  };

  return (
    <ModalMUI open={isOpened} onClose={onClose}>
      <Container>{getModal(modal)}</Container>
    </ModalMUI>
  );
};

const Container = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
`;
