import React from "react";
import Sidebar from "../components/LeftSidebar";
import ExploreArea from "../components/ExploreArea";
import RightSidebar from "../components/RightSidebar";

function explore() {
  return (
    <div className="App">
      <Sidebar />
      <ExploreArea />
      <RightSidebar />
    </div>
  );
}

export default explore;
