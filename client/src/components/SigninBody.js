import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { useToast } from "@chakra-ui/toast";
import jwtDecode from "jwt-decode";
import { urlContext } from "../index";

function HomeBody() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const url = useContext(urlContext);

  const toast = useToast();

  const successToast = () => {
    toast({
      title: `Login successful`,
      position: "top",
      isClosable: true,
    });
  };

  const errorToast = () => {
    toast({
      title: `Wrong username or password`,
      status: "error",
      position: "top",
      isClosable: true,
    });
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value.toLowerCase());
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldPerson = {
      username: userName,
      password: password,
    };

    fetch(`${url}/`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(oldPerson),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("token", data.user);

          successToast();

          setTimeout(() => {
            // window.location.href = "/feed";
            navigate("/feed");
          }, 200);
        } else {
          errorToast();
        }
      })
      .then(setUserName(""))
      .then(setPassword(""));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      //user.exp in seconds and Date.now in milliseconds
      if (user.exp <= Date.now() / 1000) {
        localStorage.removeItem("token");
      } else {
        navigate("/feed");
      }
    }
  }, []);

  return (
    <div className="container">
      <div className="homeContainer">
        <div className="homeContainer-logo">
          <BsTwitter />
        </div>
        <br></br>
        <div className="homeContainer-header">
          <h2>Let's Tweet!</h2>
        </div>
        <form
          className="homeContainer-form"
          action={`${url}/signup`}
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            required
            className="homeContainer-input"
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={handleChangeUserName}
          ></input>
          <br></br>
          <input
            required
            className="homeContainer-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChangePassword}
          ></input>
          <br></br>
          <button className="homeContainer-btn" type="submit">
            Sign in
          </button>
        </form>
        <div className="homeContainer-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default HomeBody;
