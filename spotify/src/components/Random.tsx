import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetName from "./getName";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function shuffleArray(array: Array<any>) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
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

function RandAlbum() {
  let navigate = useNavigate();
  function search(formData: any) {
    const query = formData.get("artist");
    navigate(`/albumSearch/${query}`);
  }

  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const limit = 10;

  const fetchAllAlbums = async () => {
    try {
      const response = await fetch(`http://localhost:8000/albums`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setAllAlbums(shuffleArray(data));
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
    fetchAllAlbums();
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
  const albums = allAlbums.slice(startIndex, endIndex);

  if (error) return <div>Erreur: {error}</div>;
  if (!albums || albums.length === 0) return <div>Aucun album trouvé.</div>;

  return (
    <div className="flex flex-col items-center bg-[#121212]">
      <Navbar />
      <div className="w-fit flex flex-col">
        <form className="self-center text-white" action={search}>
          <input
            placeholder="Recherchez un album..."
            className="input shadow-lg focus:border-2 border-green-500 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none bg-[#292929]"
            name="artist"
            type="text"
          />
        </form>
      </div>
      <h1 className="text-white self-center m-4 text-2xl">
        Liste des albums - Page {currentPage}
      </h1>
      <div className="flex flex-wrap text-white m-4 justify-center gap-4 overflow-auto">
        {albums.map((album) => (
          <div
            className="min-w-[180px] p-2 px-3 rounded-md cursor-pointer hover:bg-[#ffffff26] w-[325px]"
            key={album.id}
          >
            <Link to={`/album/${album.id}`}>
              <img src={album.cover} alt={`Couverture de ${album.name}`} />
              <h2 className="font-bold text-xl">{album.name}</h2>
            </Link>
            <Link to={`/artists/${album.artist_id}`} key={album.artist_id}>
              <GetName id={album.artist_id} />
            </Link>
            <p className="italic text-gray-400">Voir plus</p>
          </div>
        ))}
      </div>

      <div className="text-white mb-2">
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

export default RandAlbum;
