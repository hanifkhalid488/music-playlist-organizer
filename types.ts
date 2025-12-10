export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  url: string; // Blob URL or remote URL
  cover?: string;
  isLocal?: boolean; // To know if we need to re-request file handle on reload
}

// Doubly Linked List Node
export class DLLNode {
  data: Song;
  next: DLLNode | null;
  prev: DLLNode | null;

  constructor(data: Song) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// Stack Node (Singly Linked for simplicity)
export class StackNode {
  data: Song;
  next: StackNode | null;

  constructor(data: Song) {
    this.data = data;
    this.next = null;
  }
}

// Queue Node (Singly Linked)
export class QueueNode {
  data: Song;
  next: QueueNode | null;

  constructor(data: Song) {
    this.data = data;
    this.next = null;
  }
}

export type SortOption = 'title' | 'artist' | 'duration';
