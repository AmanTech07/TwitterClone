import React from "react";
// import Header from "../components/Header";
// import ProfileBody from "../components/ProfileBody";
import SearchArea from "../components/SearchArea";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

function Search() {
  return (
    <div className="App">
      <LeftSidebar />
      <SearchArea />
      <RightSidebar />
    </div>
  );
}

export default Search;
