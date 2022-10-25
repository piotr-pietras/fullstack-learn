import { PostBoard } from "./features/PostBoard/PostBoard";
import { MainLayout } from "./layouts/MainLayout";
import { Navigator } from "./features/Navigator";
import { useEffect } from "react";
import { useAppDispatch } from "./services/store";
import { LoginActions } from "./login.store";
import { Backend } from "./services/backend";
import { Modal } from "./features/Modals/Modal";

function App() {
  const dispatch = useAppDispatch();
  const { dataFetched } = LoginActions;

  useEffect(() => {
    dispatch(dataFetched(Backend.getLogin()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <MainLayout drawerChildren={<Navigator />}>
        <PostBoard />
      </MainLayout>
      <Modal />
    </div>
  );
}

export default App;
