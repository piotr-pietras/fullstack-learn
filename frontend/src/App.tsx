import { PostBoard } from "./features/PostBoard/PostBoard";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <PostBoard />
      </MainLayout>
    </div>
  );
}

export default App;
