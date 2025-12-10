import { Song, DLLNode } from '../types';

export class DoublyLinkedList {
  head: DLLNode | null;
  tail: DLLNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Insert at the end
  append(song: Song): void {
    const newNode = new DLLNode(song);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
    }
    this.size++;
  }

  // Delete by ID
  delete(id: string): void {
    let current = this.head;
    while (current) {
      if (current.data.id === id) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          // Deleting head
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          // Deleting tail
          this.tail = current.prev;
        }
        this.size--;
        return;
      }
      current = current.next;
    }
  }

  // Update song details
  update(id: string, updatedData: Partial<Song>): void {
    let current = this.head;
    while (current) {
      if (current.data.id === id) {
        current.data = { ...current.data, ...updatedData };
        return;
      }
      current = current.next;
    }
  }

  // Convert to array for React rendering & storage
  toArray(): Song[] {
    const result: Song[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // Rebuild from storage
  fromArray(songs: Song[]): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
    songs.forEach(song => this.append(song));
  }

  findNode(id: string): DLLNode | null {
    let current = this.head;
    while (current) {
      if (current.data.id === id) return current;
      current = current.next;
    }
    return null;
  }
}
