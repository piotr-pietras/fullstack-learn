import { PostBoard } from "./features/PostBoard/PostBoard";
import { MainLayout } from "./layouts/MainLayout";
import { Navigator } from "./features/Navigator";

function App() {
  return (
    <div className="App">
      <MainLayout drawerChildren={<Navigator/>}>
        <PostBoard />
      </MainLayout>
    </div>
  );
}

export default App;
