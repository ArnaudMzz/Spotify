import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

interface getNameProps {
  id: number;
}

interface Artist {
  id: number;
  name: string;
}

const GetName: React.FC<getNameProps> = ({ id }) => {
  const [artist, setArtists] = useState<Artist | null>(null);
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
  useEffect(() => {
    fetchArtist();
  }, []);
  if (error) return <div>Erreur: {error}</div>;
  if (!artist) return <div>Aucun artistes trouvé.</div>;
  return (
    <>
      <Link to={`/artists/${id}`}>
        <p>{artist.name}</p>
      </Link>
    </>
  );
};

export default GetName;
