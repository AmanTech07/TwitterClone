import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import Explore from "./routes/explore";
import Profile from "./routes/profile";
import SignUp from "./routes/signUp";
import Search from "./routes/search";
import { ChakraProvider } from "@chakra-ui/react";
import { createContext } from "react";

export const urlContext = createContext("");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <urlContext.Provider value="http://127.0.0.1:5000">
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<App />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore/" element={<Explore />} />
          <Route path="/explore/:tag" element={<Explore />} />
          <Route path="/profile/:userName" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </urlContext.Provider>
);
