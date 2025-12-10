import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Music2, History, ListMusic, ArrowUpDown } from 'lucide-react';
import { DoublyLinkedList } from './dsa/doublyLinkedList';
import { Stack } from './dsa/stack';
import { Queue } from './dsa/queue';
import { mergeSort } from './dsa/mergeSort';
import { Song, SortOption } from './types';
import { Player } from './components/Player';
import { SongCard } from './components/SongCard';
import { Modal } from './components/Modal';

// Initial Sample Data to populate if empty
const SAMPLE_SONGS: Song[] = [
  { id: '1', title: 'Midnight City', artist: 'M83', duration: 243, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'https://picsum.photos/200?random=1' },
  { id: '2', title: 'Starlight', artist: 'Muse', duration: 239, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'https://picsum.photos/200?random=2' },
  { id: '3', title: 'Intro', artist: 'The xx', duration: 127, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: 'https://picsum.photos/200?random=3' },
];

function App() {
  // DSA Instances stored in Refs to persist logic without re-rendering automatically
  const playlistDLL = useRef(new DoublyLinkedList());
  const historyStack = useRef(new Stack());
  const playQueue = useRef(new Queue());

  // React State for rendering
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [history, setHistory] = useState<Song[]>([]);
  const [queue, setQueue] = useState<Song[]>([]);
  
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // UI State
  const [view, setView] = useState<'playlist' | 'history' | 'queue'>('playlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const storedPlaylist = localStorage.getItem('dsa_playlist');
    const storedHistory = localStorage.getItem('dsa_history');
    const storedQueue = localStorage.getItem('dsa_queue');

    if (storedPlaylist) {
      const parsed = JSON.parse(storedPlaylist);
      playlistDLL.current.fromArray(parsed);
      setPlaylist(parsed);
    } else {
      // Load samples
      SAMPLE_SONGS.forEach(s => playlistDLL.current.append(s));
      updatePlaylistView();
    }

    if (storedHistory) {
      const parsed = JSON.parse(storedHistory);
      historyStack.current.fromArray(parsed);
      setHistory(historyStack.current.toArray());
    }

    if (storedQueue) {
      const parsed = JSON.parse(storedQueue);
      playQueue.current.fromArray(parsed);
      setQueue(playQueue.current.toArray());
    }
  }, []);

  // Sync to LocalStorage whenever state updates
  useEffect(() => {
    localStorage.setItem('dsa_playlist', JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    localStorage.setItem('dsa_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('dsa_queue', JSON.stringify(queue));
  }, [queue]);


  // Helper to refresh React state from DSA structures
  const updatePlaylistView = () => {
    setPlaylist(playlistDLL.current.toArray());
  };
  const updateHistoryView = () => {
    setHistory(historyStack.current.toArray());
  };
  const updateQueueView = () => {
    setQueue(playQueue.current.toArray());
  };

  // --- Actions ---

  const handleAddSong = (song: Song) => {
    if (editingSong) {
      playlistDLL.current.update(editingSong.id, song);
      setEditingSong(null);
    } else {
      playlistDLL.current.append(song);
    }
    updatePlaylistView();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this song from playlist?')) {
      playlistDLL.current.delete(id);
      updatePlaylistView();
      if (currentSong?.id === id) {
        handleNext();
      }
    }
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setIsModalOpen(true);
  };

  const handleSort = (criterion: SortOption) => {
    // 1. Convert DLL to Array
    const arr = playlistDLL.current.toArray();
    // 2. Perform Merge Sort (Pure Function)
    const sorted = mergeSort(arr, criterion);
    // 3. Rebuild DLL
    playlistDLL.current.fromArray(sorted);
    // 4. Update View
    updatePlaylistView();
  };

  const addToQueue = (song: Song) => {
    playQueue.current.enqueue(song);
    updateQueueView();
  };

  const playSong = (song: Song) => {
    if (currentSong) {
      // Add current to history before switching
      historyStack.current.push(currentSong);
      updateHistoryView();
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleNext = () => {
    // 1. Check Queue
    const nextInQueue = playQueue.current.dequeue();
    if (nextInQueue) {
      updateQueueView();
      playSong(nextInQueue);
      return;
    }

    // 2. Check Playlist (DLL Next)
    if (currentSong) {
      const currentNode = playlistDLL.current.findNode(currentSong.id);
      if (currentNode && currentNode.next) {
        playSong(currentNode.next.data);
      } else {
        setIsPlaying(false); // End of playlist
      }
    }
  };

  const handlePrev = () => {
    if (currentSong) {
      const currentNode = playlistDLL.current.findNode(currentSong.id);
      if (currentNode && currentNode.prev) {
        playSong(currentNode.prev.data);
      }
    }
  };

  // --- Filtering ---
  const filteredPlaylist = playlist.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Music2 size={32} />
            <h1 className="text-xl font-bold tracking-tight text-white">DSA Music<span className="text-indigo-500">.</span></h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2 border border-slate-700 focus-within:border-indigo-500 transition-colors w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search songs or artists..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full placeholder-slate-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            onClick={() => { setEditingSong(null); setIsModalOpen(true); }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-indigo-900/20"
          >
            <Plus size={18} /> Add Song
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-1">
          <button 
            onClick={() => setView('playlist')}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors ${view === 'playlist' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <Music2 size={18} /> Main Playlist
          </button>
          <button 
            onClick={() => setView('queue')}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors ${view === 'queue' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <ListMusic size={18} /> Play Queue <span className="bg-slate-800 text-xs px-2 py-0.5 rounded-full">{queue.length}</span>
          </button>
          <button 
            onClick={() => setView('history')}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors ${view === 'history' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <History size={18} /> Recently Played
          </button>
        </div>

        {/* Sorting Controls (Only for Playlist View) */}
        {view === 'playlist' && (
          <div className="flex justify-end gap-2 mb-4">
             <div className="flex items-center gap-2 text-xs text-slate-500 mr-2">
                <ArrowUpDown size={14} /> Sort by:
             </div>
             <button onClick={() => handleSort('title')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs transition">Name</button>
             <button onClick={() => handleSort('artist')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs transition">Artist</button>
             <button onClick={() => handleSort('duration')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs transition">Duration</button>
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-2">
          {view === 'playlist' && (
            <>
              {filteredPlaylist.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  <p>No songs found.</p>
                  <p className="text-sm">Click "Add Song" to upload tracks from assets/songs.</p>
                </div>
              ) : (
                filteredPlaylist.map(song => (
                  <SongCard 
                    key={song.id} 
                    song={song} 
                    isPlaying={isPlaying && currentSong?.id === song.id}
                    isActive={currentSong?.id === song.id}
                    onPlay={() => playSong(song)}
                    onDelete={() => handleDelete(song.id)}
                    onEdit={() => handleEdit(song)}
                    onQueue={() => addToQueue(song)}
                  />
                ))
              )}
            </>
          )}

          {view === 'queue' && (
             queue.length === 0 ? (
              <div className="text-center py-20 text-slate-500">Queue is empty.</div>
             ) : (
               queue.map((song, idx) => (
                <SongCard 
                  key={`${song.id}-${idx}`} 
                  song={song} 
                  isPlaying={false}
                  isActive={false}
                  onPlay={() => { /* Queue items play when dequeued */ }}
                />
               ))
             )
          )}

          {view === 'history' && (
             history.length === 0 ? (
              <div className="text-center py-20 text-slate-500">No playback history yet.</div>
             ) : (
               history.map((song, idx) => (
                <SongCard 
                  key={`${song.id}-hist-${idx}`} 
                  song={song} 
                  isPlaying={false}
                  isActive={false}
                  onPlay={() => playSong(song)}
                />
               ))
             )
          )}
        </div>

      </main>

      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
        onEnded={handleNext}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSong}
        initialData={editingSong}
      />
    </div>
  );
}

export default App;
