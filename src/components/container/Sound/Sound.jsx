import React from "react";
import Sound from "react-sound";
import aSpiritOfBushi from "../../assets/A-Spirit-of-Bushi.mp3";

const PlayMusic = ({ isPlaying }) => {
  const handleMusicLoading = () => {};
  const handleMusicPlaying = () => {};
  const handleMusicFinishedPlaying = () => {};
  return (
    <div>
      <Sound
        url={aSpiritOfBushi}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={300}
        onLoading={handleMusicLoading}
        onPlaying={handleMusicPlaying}
        onFinishedPlaying={handleMusicFinishedPlaying}
        loop={true}
      />
    </div>
  );
};

export default PlayMusic;
