import { Song, StackNode } from '../types';

export class Stack {
  top: StackNode | null;
  size: number;

  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(song: Song): void {
    const newNode = new StackNode(song);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop(): Song | null {
    if (!this.top) return null;
    const poppedNode = this.top;
    this.top = this.top.next;
    this.size--;
    return poppedNode.data;
  }

  peek(): Song | null {
    return this.top ? this.top.data : null;
  }

  toArray(): Song[] {
    const result: Song[] = [];
    let current = this.top;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  fromArray(songs: Song[]): void {
    // When loading from storage array (which is usually ordered top-to-bottom visually),
    // we need to be careful to reconstruct the stack correctly. 
    // If the array is [MostRecent, Older, Oldest], we push Oldest first.
    this.top = null;
    this.size = 0;
    for (let i = songs.length - 1; i >= 0; i--) {
      this.push(songs[i]);
    }
  }
}
