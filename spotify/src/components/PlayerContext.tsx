import React, {
  createContext,
  useState,
  useRef,
  useContext,
  ReactNode,
} from "react";

interface PlayerContextType {
  currentTrack: string | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playTrack: (trackUrl: string) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const playTrack = (trackUrl: string) => {
    setCurrentTrack(trackUrl);
    if (audioRef.current) {
      audioRef.current.src = trackUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{ currentTrack, isPlaying, togglePlay, playTrack, audioRef }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
