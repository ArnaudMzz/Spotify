import React, { useEffect, useState } from "react";
import ArtistsItem from "./ArtistsItem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

interface Artist {
  id: number;
  name: string;
  description: string;
  bio: string;
  photo: string;
}

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

function ArtistsDetail() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtists] = useState<Artist | null>(null);
  const [albums, setAllAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchArtist = async () => {
    try {
      const response = await fetch(`http://localhost:8000/artists/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setArtists(data.artist || data);
    } catch (error) {
      console.error("Erreur:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    }
  };

  const fetchAllAlbums = async () => {
    try {
      const response = await fetch(`http://localhost:8000/albums/artist/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setAllAlbums(data);
    } catch (error) {
      console.error("Erreur:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    }
  };

  useEffect(() => {
    fetchArtist();
    fetchAllAlbums();
  }, []);

  if (error) return <div>Erreur: {error}</div>;
  if (!artist) return <div>Aucun artistes trouvé.</div>;

  return (
    <div className="bg-[#121212] overflow-auto">
      <Navbar />
      <div
        key={artist.id}
        className="p-4 my-3 rounded hover:bg-[#ffffff26] flex flex-wrap text-white pb-4 mb-4 border-b border-[#ffffff26]"
      >
        <ArtistsItem
          id={artist.id}
          name={artist.name}
          description={artist.description}
          bio={artist.bio}
          photo={artist.photo}
        />
      </div>

      <div>
        <h1 className="text-white text-lg font-bold pl-4">
          Albums de {artist.name}
        </h1>
        <div className="flex flex-wrap">
          {albums.map((album) => (
            <Link to={`/album/${album.id}`}>
              <div
                key={album.id}
                className="text-white mr-4 ml-4 p-2 hover:bg-[#ffffff26]"
              >
                <img
                  src={album.cover_small}
                  alt={`Couverture de ${album.name}`}
                />
                <h2 className="font-bold pt-2">{album.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistsDetail;
