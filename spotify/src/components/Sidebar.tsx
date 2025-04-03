const Sidebar = () => {
  return (
    <>
      <div className="w-[25%] min-w-[300px] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img className="w-6" src="/images/home.png" alt="icone home" />
            <a href="/" className="font-bold">
              Accueil
            </a>
          </div>
          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img className="w-6" src="/images/search.png" alt="icone home" />
            <p className="font-bold">Recherchez</p>
          </div>
        </div>
        <div className="bg-[#121212] h-[85%] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                className="w-8"
                src="/images/stack.png"
                alt="icone playlist"
              />
              <p className="font-semibold">Bibliothèque</p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-5" src="/images/arrow.png" alt="icone flèche" />
              <img className="w-5" src="/images/plus.png" alt="icone plus" />
            </div>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1>Créez votre playlist</h1>
            <p className="font-light">En cliquant ci-dessous :</p>
            <button className="px-4 py-1.5 bg-white text-[15] text-black rounded-full mt-4">
              Créer Playlist
            </button>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
            <h1>Suivez des podcasts</h1>
            <p className="font-light">Des histoires sans fin !</p>
            <button className="px-4 py-1.5 bg-white text-[15] text-black rounded-full mt-4">
              Parcourir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
