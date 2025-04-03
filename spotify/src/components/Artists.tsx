import { useNavigate } from "react-router-dom";
import ArtistsPage from "./ArtistsPage";
import Navbar from "./Navbar";

const ArtistsHome = () => {
  let navigate = useNavigate();
  function search(formData: any) {
    const query = formData.get("artist");
    navigate(`/artistsSearch/${query}`);
  }
  return (
    <>
      <div className="flex flex-col items-center bg-[#121212]">
        <Navbar />
        <form className="self-center text-white" action={search}>
          <input
            placeholder="Recherchez un(e) artiste..."
            className="input mb-4 shadow-lg focus:border-2 border-green-500 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none bg-[#292929]"
            name="artist"
            type="text"
          />
        </form>
        <ArtistsPage />
      </div>
    </>
  );
};

export default ArtistsHome;
