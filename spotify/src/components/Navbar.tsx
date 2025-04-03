import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold p-4">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            src="/images/left_arrow.png"
            alt="Left arrow"
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          />
          <img
            onClick={() => navigate(+1)}
            src="/images/right_arrow.png"
            alt="Left arrow"
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Premium
          </p>
          <p className="bg-black text-white py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Installer
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
            A
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-4 self-start">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          Tout
        </p>
        <Link to={`/albums`}>
          <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer">
            Albums
          </p>
        </Link>
        <Link to={`/artists`}>
          <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer">
            Artistes
          </p>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
