import { useRef, useState, useEffect } from "react";
import "../styles/musicplayer.css";

function MusicPlayer() {
  const audio = useRef(null);

  const playlist = [
    { title: "Supremo Track 1", file: "/music/track1.mp3" },
    { title: "Supremo Track 2", file: "/music/track2.mp3" },
    { title: "Supremo Track 3", file: "/music/track3.mp3" },
    { title: "Supremo Track 4", file: "/music/track4.mp3" },
    { title: "Supremo Track 5", file: "/music/track5.mp3" },
    { title: "Supremo Track 6", file: "/music/track6.mp3" },
    { title: "Supremo Track 7", file: "/music/track7.mp3" },
    { title: "Supremo Track 8", file: "/music/track8.mp3" },
    { title: "Supremo Track 9", file: "/music/track9.mp3" },
    { title: "Supremo Track 10", file: "/music/track10.mp3" },
  ];

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
    }
  }, [volume]);

  function playPause() {
    if (!audio.current) return;

    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      audio.current.play();
      setPlaying(true);
    }
  }

  function next() {
    const index = (current + 1) % playlist.length;
    setCurrent(index);
  }

  function prev() {
    const index =
      current === 0
        ? playlist.length - 1
        : current - 1;

    setCurrent(index);
  }

  useEffect(() => {
    if (!audio.current) return;

    audio.current.load();

    if (playing) {
      audio.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <div className="music-player">

      <h3>🎵 Supremo Radio</h3>

      <p>{playlist[current].title}</p>

      <audio
        ref={audio}
        onEnded={next}
      >
        <source src={playlist[current].file} type="audio/mpeg" />
      </audio>

      <div className="controls">
        <button onClick={prev}>⏮</button>

        <button onClick={playPause}>
          {playing ? "⏸" : "▶"}
        </button>

        <button onClick={next}>⏭</button>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />

      <p style={{ marginTop: "10px", fontSize: "12px", color: "#bbb" }}>
        {current + 1} / {playlist.length}
      </p>

    </div>
  );
}

export default MusicPlayer;