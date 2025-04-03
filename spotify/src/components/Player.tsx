import { usePlayer } from "./PlayerContext";

const Player = () => {
  const { currentTrack, isPlaying, togglePlay, audioRef } = usePlayer();

  return (
    <div className="h-[10%] w-[100vw] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img src="/images/img1.jpg" alt="album" className="w-12" />
        <div>
          <p>{currentTrack ? "Titre de la musique" : "Aucune musique"}</p>
          <p>Artiste</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            src="/images/shuffle.png"
            alt="Shuffle icon"
            className="w-4 cursor-pointer"
          />
          <img
            src="/images/prev.png"
            alt="Previous icon"
            className="w-4 cursor-pointer"
          />
          <img
            onClick={togglePlay}
            src={isPlaying ? "/images/pause.png" : "/images/play.png"}
            alt="Pause icon"
            className="w-4 cursor-pointer"
          />
          <img
            src="/images/next.png"
            alt="Next icon"
            className="w-4 cursor-pointer"
          />
          <img
            src="/images/loop.png"
            alt="Loop icon"
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>1:06</p>
          <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr className="h-1 border-none w-0 bg-green-600 rounded-full" />
          </div>
          <p>3:20</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img
          src="/images/plays.png"
          alt="Plays button"
          className="w-4 sm:w-3"
        />
        <img
          src="/images/queue.png"
          alt="Queue button"
          className="w-4 sm:w-3"
        />
        <img
          src="/images/speaker.png"
          alt="Speaker button"
          className="w-4 sm:w-3"
        />
        <img
          src="/images/volume.png"
          alt="Volume button"
          className="w-4 sm:w-3"
        />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img
          src="/images/mini-player.png"
          alt="Mini player button"
          className="w-4"
        />
        <img src="/images/zoom.png" alt="Zoom button" className="w-4" />
      </div>

      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default Player;
