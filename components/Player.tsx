import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react';
import { Song } from '../types';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onEnded: () => void;
}

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onEnded
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 text-white z-50 shadow-2xl">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      />
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        
        {/* Song Info */}
        <div className="flex items-center gap-3 w-1/3 min-w-[150px]">
           <div className="w-12 h-12 bg-indigo-600 rounded-md flex items-center justify-center overflow-hidden">
             {currentSong.cover ? (
               <img src={currentSong.cover} alt="Cover" className="w-full h-full object-cover" />
             ) : (
               <Volume2 size={24} className="text-indigo-200" />
             )}
           </div>
           <div className="overflow-hidden">
             <h3 className="font-semibold text-sm truncate">{currentSong.title}</h3>
             <p className="text-xs text-slate-400 truncate">{currentSong.artist}</p>
           </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-6 mb-2">
            <button onClick={onPrev} className="text-slate-400 hover:text-white transition">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={onPlayPause} 
              className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-400 transition shadow-lg shadow-indigo-500/30"
            >
              {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-1" />}
            </button>
            <button onClick={onNext} className="text-slate-400 hover:text-white transition">
              <SkipForward size={24} />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full text-xs text-slate-400">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume / Extra */}
        <div className="flex items-center justify-end gap-3 w-1/3">
           <Volume2 size={20} className="text-slate-400" />
           <div className="w-24 h-1 bg-slate-700 rounded-full">
             <div className="w-3/4 h-full bg-slate-400 rounded-full"></div>
           </div>
           <Maximize2 size={18} className="text-slate-400 ml-2 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};
