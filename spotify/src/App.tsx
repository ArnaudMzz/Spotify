import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Utilisation de React Router v6
import { PlayerProvider } from "./components/PlayerContext"; // Import du PlayerProvider
import Home from "./components/Home";
import Artists from "./components/Artists";
import ArtistsDetail from "./components/ArtistsDetail";
import ArtistsSearch from "./components/ArtistsSearch";
import AlbumList from "./components/album";
import AlbumDetail from "./components/albumDetails";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import AlbumSearch from "./components/albumSearch";
import Navbar from "./components/Navbar";
import RandomAlbum from "./components/Random";

function App() {
  return (
    <PlayerProvider>
      <div className="bg-black w-fit h-screen">
        <div className="h-[90%] flex overflow-auto">
          <Sidebar />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accueil" element={<RandomAlbum />} />
              <Route path="/albums" element={<AlbumList />} />
              <Route path="/album/:id" element={<AlbumDetail />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<ArtistsDetail />} />
              <Route path="/artistsSearch/" element={<Artists />} />
              <Route path="/artistsSearch/:name" element={<ArtistsSearch />} />
              <Route path="/albumSearch/:name" element={<AlbumSearch />} />
            </Routes>
          </Router>
        </div>
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default App;
