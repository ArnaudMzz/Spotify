import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlayer } from "./PlayerContext"; // Importer le PlayerContext
import GetName from "./getName";
import Navbar from "./Navbar";

interface Album {
  id: number;
  artist_id: number;
  name: string;
  description: string;
  cover: string;
  cover_small: string;
  release_date: number;
  popularity: number;
}

interface Tracks {
  id: number;
  album_id: number;
  name: string;
  mp3: string;
  duration: number;
}

function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Tracks[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { playTrack } = usePlayer(); // Utiliser le playTrack du contexte

  useEffect(() => {
    const fetchAlbumDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/albums/${id}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setAlbum(data.album || data);
        setTracks(data.tracks || data);
      } catch (error) {
        console.error("Erreur:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue s'est produite.");
        }
      }
    };

    fetchAlbumDetail();
  }, [id]);

  if (error) return <div>Erreur: {error}</div>;
  if (!album) return <div>Chargement...</div>;
  if (!tracks.length) return <div>Pas de musiques trouvées...</div>;

  return (
    <>
      <div className="mb-4 text-white bg-[#121212] overflow-auto">
        <Navbar />
        <div className="flex">
          <div className="min-w-[180px] p-2 px-3 my-4 rounded cursor-pointer hover:bg-[#ffffff26] flex flex-col gap-4 pb-4 mb-4 border-b border-[#ffffff26] w-full">
            <h1 className="pb-2 font-bold text-2xl">{album.name}</h1>
            <img
              src={album.cover}
              alt="album"
              className="w-[280px] shadow-md shadow-black"
            />
            <div className="text-lg font-bold">
              <Link to={`/artists/${album.artist_id}`} key={album.artist_id}>
                <GetName id={album.artist_id} />
              </Link>
            </div>
            <p className="italic text-gray-400 text-sm">{album.description}</p>
            <p className="mt-1">
              <img
                src="/images/spotify_logo.png"
                alt="Spotify logo"
                className="inline-block w-5"
              />
              <b> Spotify</b> • Date de sortie:{" "}
              {new Date(album.release_date * 1000).toLocaleDateString()}
              <b> • Popularité: {album.popularity}</b>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap text-white m-4 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="w-[230px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
              onClick={() => playTrack(track.mp3)} // Lancer la musique au clic
            >
              <img src={album.cover_small} alt="album" className="rounded" />
              <p className="font-bold mt-2 mb-1">{track.name}</p>
              <p className="text-slate-200 text-sm">{track.duration} sec</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AlbumDetail;
