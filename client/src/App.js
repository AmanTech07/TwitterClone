import "./App.css";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Sidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="HeaderAndFeed">
        <Header />
        <Feed />
      </div>
      <RightSidebar />
    </div>
  );
}

export default App;
