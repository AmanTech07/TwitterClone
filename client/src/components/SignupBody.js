import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { useToast } from "@chakra-ui/toast";
import { urlContext } from "../index";

function SignupBody() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = useContext(urlContext);

  const toast = useToast();
  const successToast = () => {
    toast({
      title: `User Registration Successfull!`,
      position: "top",
      isClosable: true,
      status: "success",
    });
  };

  const failureToast = () => {
    toast({
      title: `Username already registered!`,
      position: "top",
      isClosable: true,
      status: "error",
    });
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value.toLowerCase());
  };

  const handleChangeEmailId = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      username: userName.split(" ").join(""),
      email: email,
      password: password,
    };

    fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          successToast();
          setTimeout(() => {
            navigate("/");
          }, 400);
        }
        else {
          failureToast();
          setTimeout(() => {
            navigate("/signup");
          }, 400);
        }
      })
      .then(setUserName(""))
      .then(setEmail(""))
      .then(setPassword(""));
  };

  return (
    <div className="container">
      <div className="homeContainer">
        <div className="homeContainer-logo">
          <BsTwitter />
        </div>
        <br></br>
        <div className="homeContainer-header">
          <h2>Join Twitter Today</h2>
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
            type="text"
            placeholder="Enter emailId"
            value={email}
            onChange={handleChangeEmailId}
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
            Sign up
          </button>
        </form>
        <div className="homeContainer-signup">
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupBody;
