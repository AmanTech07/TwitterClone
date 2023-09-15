import React from "react";
import Header from "../components/Header";
import ProfileBody from "../components/ProfileBody";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

function Profile() {
  return (
    <div className="App">
      <LeftSidebar />
      <div className="HeaderAndFeed">
        <Header />
        <ProfileBody />
      </div>
      <RightSidebar />
    </div>
  );
}

export default Profile;
