import React, { useEffect, useState } from "react";
import ArtistsItem from "./ArtistsItem";

interface Artist {
  id: number;
  name: string;
  description: string;
  bio: string;
  photo: string;
}

function ArtistsList() {
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const limit = 10;

  const fetchAllArtists = async () => {
    try {
      const response = await fetch(`http://localhost:8000/artists`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setAllArtists(data);
      setTotalPages(Math.ceil(data.length / limit));
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
    fetchAllArtists();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const artists = allArtists.slice(startIndex, endIndex);

  if (error) return <div>Erreur: {error}</div>;
  if (artists.length === 0) return <div>Aucun artistes trouvé.</div>;

  return (
    <div key={currentPage} className="text-white flex flex-col overflow-auto">
      <h2 className="text-white self-center m-4 text-2xl">
        Liste des artistes - Page {currentPage}
      </h2>
      <div className="flex flex-wrap text-white m-4 justify-center gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="min-w-[180px] p-2 px-3 rounded-md cursor-pointer hover:bg-[#ffffff26] w-[250px] text-l"
          >
            <ArtistsItem
              id={artist.id}
              name={artist.name}
              description={artist.description}
              bio={"Voir plus"}
              photo={artist.photo}
            />
          </div>
        ))}
      </div>

      <div className="text-white mb-2 self-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-black text-white py-1 px-3 rounded-2xl text-[15px] cursor-pointer border-white border mr-2"
        >
          Précédent
        </button>
        <span>
          {" "}
          Page {currentPage} sur {totalPages}{" "}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-black text-white py-1 px-5 rounded-2xl text-[15px] cursor-pointer border-white border ml-2"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default ArtistsList;
