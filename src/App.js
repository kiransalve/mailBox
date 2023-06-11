import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SideBar, Feed, VideoDetail, ChannelDetail, SearchFeed } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Feed />}></Route>
          <Route path="/feed/:id" element={<Feed />}></Route>
          <Route path="/channel/:id" element={<ChannelDetail />}></Route>
          <Route path="/search/:id" element={<SearchFeed />}></Route>
          <Route path="/watch/:id" element={<VideoDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
