## 👥 Group Members
- Hanif Khalid (Registration ID: B24F1000CS150)
- Samiullah Name (Registration ID:B24F0637CS131 )
- Abu Bakar (Registration ID:B24F0543CS143 )


# 🎵 Music Playlist Organizer  
**DSA Final Group Project**


## 📌 Project Overview
The **Music Playlist Organizer** is a modern, web-based application designed to efficiently manage and organize a digital music library.  
This project has been developed as a **Final Group Project for the Data Structures and Algorithms (DSA) course** and demonstrates the practical implementation of core DSA concepts in a real-world application.

The application is built using **React with TypeScript** and focuses on performance, usability, and clean software design.  
It allows users to play, manage, search, and sort songs intelligently while applying fundamental computer science principles.


## 🎯 Objectives of the Project
- To apply **Data Structures and Algorithms** concepts in a practical scenario  
- To understand how DSA improves performance and data management  
- To build an interactive and user-friendly application using modern web technologies  
- To strengthen problem-solving and teamwork skills through a group project  


## ✨ Key Features
- ➕ **Add New Songs** – Add songs dynamically to the playlist  
- ❌ **Delete Songs** – Remove songs efficiently  
- ▶️⏸️ **Play / Pause Music** – User-friendly playback controls  
- ⏭️⏮️ **Next / Previous Navigation** – Seamless song navigation  
- 🕒 **Recently Played History** – Implemented using **Stack (LIFO)**  
- 📥 **Play Next Queue** – Managed using **Queue (FIFO)**  
- 🔍 **Search Songs** – Search by title or artist  
- 🔀 **Sort Songs** – Efficient sorting using **Merge Sort**  
- 🎨 **Dynamic & Interactive UI** – Built with React’s component-based architecture  


## 🛠️ Technologies Used
- **React.js** (Functional Components & Hooks)  
- **TypeScript** – For strong typing and maintainable code  
- **Vite** – Fast and optimized development tool  
- **Data Structures & Algorithms**:
  - Doubly Linked List  
  - Stack  
  - Queue  
  - Merge Sort  


## 🧠 Data Structures & Algorithms Implementation
- **Doubly Linked List:**  
  Used to manage the main playlist, enabling efficient forward and backward navigation between songs.

- **Stack:**  
  Maintains a history of recently played songs following the **Last In, First Out (LIFO)** principle.

- **Queue:**  
  Handles the *Play Next* functionality using the **First In, First Out (FIFO)** principle.

- **Merge Sort:**  
  Used for sorting songs by title or artist with **O(n log n)** time complexity for efficient performance.


## 📁 Project Structure

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

## 🎥 Demo Video
- Watch the demo video here: [Click to View](https://youtu.be/Rb2j_fUMUoU)


## 👨‍🏫 Project Supervisor

**Name:** Obaidullah Miakhil  
**Designation:** Lab Engineer  
**Course:** Data Structures and Algorithms (DSA)  

This project was developed as a **Final Group Project** for the **Data Structures and Algorithms (DSA)** course under the supervision of **Lab Engineer Obaidullah Miakhil**.  
His guidance, supervision, and valuable feedback contributed significantly to the successful completion of this project.

## 📖 Supervision Note
> "This project was developed for the Data Structures and Algorithms (DSA) course under the supervision of Lab Engineer Obaidullah Miakhil."
