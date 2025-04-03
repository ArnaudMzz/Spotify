import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const ArtistsHome = () => {
  return (
    <>
      <div className="w-full bg-[#121212]">
        <Navbar />
        <div className="flex gap-4 pt-4 overflow-auto">
          <div className="min-w-[180px] p-2 px-3 rounded-md cursor-pointer hover:bg-[#ffffff26] w-[325px]">
            <Link to={`/accueil`}>
              <img
                src="/images/img8.jpg"
                alt=" pochette"
                className="rounded-md"
              />
              <p className="font-bold mt-2 mb-1 text-white text-xl">
                Découvrir
              </p>
              <p className="text-slate-200 text-md">
                Découvrez l'inconnu du monde musical !
              </p>
            </Link>
          </div>
          <div className="min-w-[180px] p-2 px-3 rounded-md cursor-pointer hover:bg-[#ffffff26] w-[325px]">
            <Link to={`/artists`}>
              <img
                src="/images/img7.jpg"
                alt=" pochette"
                className="rounded-md"
              />
              <p className="font-bold mt-2 mb-1 text-white text-xl">
                Liste des Artistes
              </p>
              <p className="text-slate-200 text-md">
                Ici la liste de vos artistes préféré !
              </p>
            </Link>
          </div>
          <div className="min-w-[180px] p-2 px-3 rounded-md cursor-pointer hover:bg-[#ffffff26] w-[325px]">
            <Link to={`/albums`}>
              <img
                src="/images/img12.jpg"
                alt=" pochette"
                className="rounded-md"
              />
              <p className="font-bold mt-2 mb-1 text-white text-xl">
                Liste des albums
              </p>
              <p className="text-slate-200 text-md">
                Parcourez les vos albums favoris et découvrez en d'autres !
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistsHome;
