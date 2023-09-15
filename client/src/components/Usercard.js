import { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { urlContext } from "../index";

function Usercard(props) {
  const url = useContext(urlContext);

  return (
    <Link to={`/profile/${props.username}`}>
      <div className="card">
        <div className="card-img">
          <img
            className="tweet-avatar"
            src={`${url}/images/${props.avatar}`}
          ></img>
        </div>
        <div className="card-text">
          <div className="card-text-username">{props.username}</div>
          <div className="card-text-follow">
            <div className="card-text-followers">
              {props.followers.length} followers
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Usercard;
