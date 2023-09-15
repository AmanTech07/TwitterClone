import React, { useState, useEffect, useContext } from "react";
import { Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Tweet from "./Tweet";
import { Link } from "react-router-dom";
import { urlContext } from "../index";
const axios = require("axios");

function ExploreArea() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState("");
  const [tweetCount, setTweetCount] = useState("20");
  const [tag, setTag] = useState("Sports");
  const [index1, setIndex1] = useState(0);
  const url = useContext(urlContext);

  const navigate = useNavigate();

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

  useEffect(() => {
    handleClick();
  }, [tag]);

  const handleClick = async () => {
    const req = await fetch(`${url}/explore/${tag}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setTweets(data.tweets);
      setActiveUser(data.activeUser.username);
      setLoading(false);
    } else console.log(data.error);
  };

  const handleSubmit = async (e) => {
    setTag(e.target.innerText);
  };

  async function addTweets(e) {
    e.preventDefault();
    const req = await fetch(`${url}/explore/${tag}?t=${tweetCount}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setTweets((prevTweets) => {
        return [...prevTweets, ...data.tweets];
      });
      setTweetCount((prevValue) => {
        return parseInt(prevValue) + 20;
      });
    } else {
      alert(data.error);
      navigate("/");
    }
  }

  return (
    <div className="HeaderAndFeed">
      <div className="tagArea">
        {tags.map((tag, index) => {
          return index1 === index ? (
            <Link to={`/explore/${tag}`}>
              <Tag
                onClick={(e) => {
                  handleSubmit(e);
                  setIndex1(index);
                }}
                size={"lg"}
                variant="solid"
                colorScheme="cyan"
              >
                {tag}
              </Tag>
            </Link>
          ) : (
            <Link to={`/explore/${tag}`}>
              <Tag
                onClick={(e) => {
                  handleSubmit(e);
                  setIndex1(index);
                }}
                size={"lg"}
              >
                {tag}
              </Tag>
            </Link>
          );
        })}
      </div>
      <div className="userTweets">
        <div className="userTweets-heading"><h1>Tweets</h1></div>
        <div className="tweets">
          <ul className="tweet-list">
            {loading ? (
              <div
                style={{ marginTop: "50px", marginLeft: "250px" }}
                className="loadingio-spinner-rolling-uzhdebhewyj"
              >
                <div className="ldio-gkgg43sozzi">
                  <div></div>
                </div>
              </div>
            ) : (
              tweets.map(function (tweet) {
                return <Tweet user={activeUser} body={tweet} />;
              })
            )}
          </ul>
        </div>
      </div>
      <form className="showMore-form" onSubmit={addTweets}>
        <button className="showMore" type="submit">
          Load More Tweets! 🐶
        </button>
      </form>
    </div>
  );
}

export default ExploreArea;
