import React, { useEffect, useState } from "react";
import ArtistsItem from "./ArtistsItem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

interface Artist {
  id: number;
  name: string;
  description: string;
  bio: string;
  photo: string;
}

function ArtistsSearch() {
  let navigate = useNavigate();
  function search(formData: any) {
    const query = formData.get("artist");
    navigate(`/artistsSearch/${query}`);
    navigate(0);
  }

  const { name } = useParams<{ name: string }>();
  let query: string;
  if (!name) query = `http://localhost:8000/artists`;
  else query = `http://localhost:8000/search?query=${name}&type=artist`;
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const limit = 10;

  const fetchAllArtists = async () => {
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setAllArtists(data.artists);
      setTotalPages(Math.ceil(data.artists.length / limit));
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
    <div className="w-fit flex flex-col bg-[#121212]">
      <Navbar />
      <form className="self-center text-white" action={search}>
        <input
          placeholder="Recherchez un(e) artiste..."
          className="input mb-4 shadow-lg focus:border-2 border-green-500 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none bg-[#292929]"
          name="artist"
          type="text"
        />
      </form>
      <div key={currentPage} className="text-white flex flex-col overflow-auto">
        <h2 className="text-white self-center m-4 text-2xl">
          Liste des artistes - Page {currentPage}
        </h2>
        <div className="flex flex-wrap text-white m-4 justify-center gap-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="w-[250px] p-2 px-3 rounded hover:bg-[#ffffff26] flex flex-wrap"
            >
              <ArtistsItem
                id={artist.id}
                name={artist.name}
                description={artist.description}
                bio={"Voir plus ..."}
                photo={artist.photo}
              />
            </div>
          ))}
        </div>

        <div className="text-white mb-2 self-center bg-[#121212]">
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
    </div>
  );
}

export default ArtistsSearch;
