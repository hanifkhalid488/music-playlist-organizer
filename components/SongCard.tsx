import React from 'react';
import { Play, Trash2, Edit2, ListPlus } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isActive: boolean;
  onPlay: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onQueue?: () => void;
}

const formatDuration = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  isPlaying, 
  isActive, 
  onPlay, 
  onDelete, 
  onEdit, 
  onQueue 
}) => {
  return (
    <div className={`group flex items-center justify-between p-3 rounded-lg mb-2 transition-all ${
      isActive ? 'bg-indigo-900/30 border border-indigo-500/50' : 'bg-slate-800 hover:bg-slate-700 border border-transparent'
    }`}>
      <div className="flex items-center gap-4 overflow-hidden">
        <div 
          onClick={onPlay}
          className={`w-12 h-12 rounded-md flex items-center justify-center cursor-pointer relative overflow-hidden flex-shrink-0 ${isActive ? 'bg-indigo-600' : 'bg-slate-600'}`}
        >
          {song.cover && <img src={song.cover} alt="Art" className="absolute inset-0 w-full h-full object-cover opacity-60" />}
          {isActive && isPlaying ? (
            <div className="flex gap-1 items-end h-4">
              <span className="w-1 bg-white animate-[bounce_1s_infinite] h-2"></span>
              <span className="w-1 bg-white animate-[bounce_1.2s_infinite] h-4"></span>
              <span className="w-1 bg-white animate-[bounce_0.8s_infinite] h-3"></span>
            </div>
          ) : (
            <Play size={20} fill="white" className="text-white relative z-10" />
          )}
        </div>
        
        <div className="min-w-0">
          <h4 className={`font-semibold text-sm truncate ${isActive ? 'text-indigo-300' : 'text-slate-200'}`}>
            {song.title}
          </h4>
          <p className="text-xs text-slate-400 truncate">{song.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 hidden sm:block">{formatDuration(song.duration)}</span>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onQueue && (
            <button onClick={onQueue} title="Add to Queue" className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-600 rounded-full transition">
              <ListPlus size={16} />
            </button>
          )}
          {onEdit && (
             <button onClick={onEdit} title="Edit" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-600 rounded-full transition">
               <Edit2 size={16} />
             </button>
          )}
          {onDelete && (
            <button onClick={onDelete} title="Delete" className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded-full transition">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
