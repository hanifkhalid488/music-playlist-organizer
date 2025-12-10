# 🎵 Music Playlist Organizer

## Project Overview

**Music Playlist Organizer** is a modern web-based application designed to help users efficiently manage and organize their music library.  
This project integrates **React with TypeScript** for a robust frontend and implements core **Data Structures and Algorithms (DSA)** to optimize performance and provide a seamless user experience.

The application allows users to play, manage, and sort their songs intelligently while demonstrating real-world applications of computer science concepts.


## Key Features

The project includes a wide range of user-friendly features:

- **Add New Songs:** Easily add songs to your playlist.  
- **Delete Songs:** Remove unwanted songs quickly.  
- **Play / Pause Music:** Control music playback intuitively.  
- **Next / Previous Navigation:** Move forward or backward between songs seamlessly.  
- **Recently Played History:** Tracks your recently played songs using Stack.  
- **Play Next Queue:** Organize songs to play next using Queue.  
- **Search and Sort:** Search songs by title or artist and sort efficiently using Merge Sort.  
- **Dynamic and Interactive UI:** Built with React’s component-based architecture for smooth updates.  

---

## Technologies Used

This project leverages modern tools and technologies:

- **React.js (Functional Components + Hooks):** For building dynamic, reusable UI components.  
- **TypeScript:** For strong typing, error reduction, and maintainable code.  
- **Vite:** A fast and efficient development build tool.  
- **Data Structures & Algorithms:** Core DSA concepts including Doubly Linked List, Stack, Queue, and Merge Sort for efficient data management.  

---

## Data Structures & Algorithms Implementation

- **Doubly Linked List:** Manages the main playlist, allowing efficient forward and backward navigation between songs.  
- **Stack:** Maintains a history of recently played songs using the **LIFO (Last In, First Out)** principle.  
- **Queue:** Handles the **Play Next** feature using the **FIFO (First In, First Out)** principle.  
- **Merge Sort:** Efficiently sorts songs by title or artist with **O(n log n)** complexity for reliable sorting.

---

## Project Structure

```txt
music-playlist-organizer/
 ┣ components/
 ┃ ┣ Model.tsx        # Modal popup component for adding songs
 ┃ ┣ Player.tsx       # Music player interface with controls
 ┃ ┗ SongCard.tsx     # Display each song as a card
 ┣ dsa/
 ┃ ┣ doublelinkedlist.ts  # Playlist management using doubly linked list
 ┃ ┣ mergesort.ts         # Sorting algorithm
 ┃ ┣ queue.ts             # Play next feature
 ┃ ┗ stack.ts             # Recently played songs
 ┣ App.tsx             # Main React application component
 ┣ index.html          # HTML entry point
 ┣ index.tsx           # React DOM render
 ┣ metadata.json       # Song data (title, artist, duration)
 ┣ types.ts            # TypeScript interfaces and types
 ┗ README.md           # Project documentation

# Clone repository
git clone https://github.com/hanifkhalid488/music-playlist-organizer.git

# Navigate to folder
cd music-playlist-organizer

# Install dependencies
npm install

# Start development server
npm run dev
