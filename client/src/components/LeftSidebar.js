import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { useToast } from "@chakra-ui/toast";
import { Tag } from "@chakra-ui/react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import moment from "moment";
import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
import { Box } from "@chakra-ui/react";
import { urlContext } from "../index";

// import jwtDecode from "jwt-decode";

function Sidebar() {
  const [activeUser, setActiveUser] = useState("");
  const [input, setInput] = useState("");
  const toast = useToast();
  const [img, setImg] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [tag, setTag] = useState("");
  const [index1, setIndex1] = useState("");
  const url = useContext(urlContext);

  const tags = [
    "Sports",
    "Politics",
    "Love",
    "Education",
    "Tech",
    "Finance",
    "Gaming",
    "Entertainment",
  ];

  const checkInput = input || img;

  const successToast = () => {
    // toast({
    //   title: `Tweet sent`,
    //   // description: <Link to={"/"}>View</Link>,
    //   position: "top",
    //   isClosable: true,
    // });

    // toast.custom(
    //   <span>
    //     Tweet sent successfully <Link to={"/"}>View</Link>
    //   </span>
    // );

    toast({
      position: "top",
      render: () => (
        <Box borderRadius="lg" color="white" p={3} bg="blue.500">
          Tweet sent{" "}
          <a href="/" style={{ textDecoration: "underline" }}>
            View
          </a>
        </Box>
      ),
    });
  };

  async function populateUser() {
    const req = await fetch(`${url}/feed`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setActiveUser(data.activeUser.username);
    } else {
      alert(data.error);
    }
  }

  populateUser();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const logout = (e) => {
    localStorage.removeItem("token");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tweet = {
      content: input,
      postedBy: {
        username: activeUser,
      },
      image: "",
      tag: tag,
      likes: [],
      retweets: [],
      comments: [],
      likeTweetBtn: "black",
      postedTweetTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
      tweetId: moment(),
    };

    const data = { tweet: JSON.stringify(tweet), image: img };
    const action = e.target.action;

    axios
      .post(`${action}`, data)
      .then(setInput(""))
      .then(setImg(""))
      .then(setIsImageSelected(false))
      .then(successToast())
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitTag = (e) => {
    setTag(e.target.innerText);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-menu-items">
          <div className="title">
            <Link to="/feed">
              <BsTwitter />
            </Link>
          </div>
        </li>
        <li className="sidebar-menu-items">
          <Link to="/feed">
            <BiHome />
            <div>Home</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <Link to="/explore/Sports">
            <FaHashtag />
            <div>Explore</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <Link to={`/profile/${activeUser}`}>
            <CgProfile />
            <div>Profile</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <Link to={`/search`}>
            <AiOutlineSearch />
            <div>Search</div>
          </Link>
        </li>
        <li onClick={logout} className="sidebar-menu-items">
          <Link to="/">
            <GrLogout />
            <div>Logout</div>
          </Link>
        </li>
        <li className="sidebar-menu-items tweet-list-item">
          <Popup
            trigger={
              <button className="tweetBtn sidebar-menu-tweetBtn">Tweet</button>
            }
            modal
            position="center"
          >
            {(close) => (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  close();
                }}
                method="post"
                encType="multipart/form-data"
                action={`${url}/feed`}
                className="tweet-form"
                id="form1"
              >
                <input
                  autoFocus
                  placeholder="What's good?"
                  type="text"
                  value={input}
                  onChange={handleChange}
                ></input>
                <div className="tweet-flex">
                  <div>
                    <AiFillCamera
                      style={{
                        color: "#1DA1F2",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>

                  <input
                    className="image-input"
                    type="text"
                    placeholder="Enter an image url here"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                  ></input>
                  <button
                    className={checkInput ? "tweetBtn" : "disabled"}
                    disabled={!checkInput}
                    type="submit"
                  >
                    {" "}
                    Tweet
                  </button>
                </div>
                <div className="tagArea">
                  {tags.map((tag, index) => {
                    return index1 === index ? (
                      // <Link to={`/topic/${tag}`}>
                      <Tag
                        onClick={(e) => {
                          handleSubmitTag(e);
                          setIndex1(index);
                        }}
                        size={"lg"}
                        variant="solid"
                        colorScheme="cyan"
                      >
                        {tag}
                      </Tag>
                    ) : (
                      // </Link>
                      // <Link to={`/topic/${tag}`}>
                      <Tag
                        onClick={(e) => {
                          handleSubmitTag(e);
                          setIndex1(index);
                        }}
                        size={"lg"}
                      >
                        {tag}
                      </Tag>
                      // </Link>
                    );
                  })}
                </div>
                <img className="tweet-preview" src={img} alt="" />
              </form>
            )}
          </Popup>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
