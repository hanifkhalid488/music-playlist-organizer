import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { Song } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (song: Song) => void;
  initialData?: Song | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Song>>({
    title: '',
    artist: '',
    duration: 0,
    cover: '',
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: '', artist: '', duration: 0, cover: 'https://picsum.photos/200' });
      setFile(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.artist) return;

    let url = initialData?.url || '';
    
    // Create object URL if file selected
    if (file) {
      url = URL.createObjectURL(file);
    }

    // Fallback for demo if no file/url provided
    if (!url) {
      url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
    }

    const newSong: Song = {
      id: initialData?.id || crypto.randomUUID(),
      title: formData.title || 'Unknown',
      artist: formData.artist || 'Unknown',
      duration: formData.duration || 180,
      url,
      cover: formData.cover || 'https://picsum.photos/200',
      isLocal: !!file
    };

    onSubmit(newSong);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Try to guess metadata
      const nameParts = selectedFile.name.replace(/\.[^/.]+$/, "").split('-');
      if (nameParts.length > 1) {
          setFormData(prev => ({...prev, artist: nameParts[0].trim(), title: nameParts[1].trim()}));
      } else {
          setFormData(prev => ({...prev, title: nameParts[0].trim()}));
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Song' : 'Add New Song'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* File Input */}
          {!initialData && (
             <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors group cursor-pointer relative">
               <input 
                 type="file" 
                 accept="audio/*" 
                 onChange={handleFileChange}
                 className="absolute inset-0 opacity-0 cursor-pointer"
               />
               <Upload className="mx-auto text-slate-400 group-hover:text-indigo-400 mb-2" size={32} />
               <p className="text-sm text-slate-300">
                 {file ? file.name : "Click to upload from assets/songs"}
               </p>
               <p className="text-xs text-slate-500 mt-1">Simulated /assets/songs selection</p>
             </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Song Title"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Artist</label>
            <input
              type="text"
              required
              value={formData.artist}
              onChange={e => setFormData({ ...formData, artist: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Artist Name"
            />
          </div>

          <div className="flex gap-4">
             <div className="flex-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">Duration (sec)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:outline-none focus:border-indigo-500"
                />
             </div>
             <div className="flex-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">Cover URL</label>
                 <input
                  type="text"
                  value={formData.cover}
                  onChange={e => setFormData({ ...formData, cover: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://..."
                />
             </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md transition-colors mt-4"
          >
            {initialData ? 'Save Changes' : 'Add Song'}
          </button>
        </form>
      </div>
    </div>
  );
};
