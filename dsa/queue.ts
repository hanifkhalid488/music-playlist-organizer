import { Song, QueueNode } from '../types';

export class Queue {
  front: QueueNode | null;
  rear: QueueNode | null;
  size: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(song: Song): void {
    const newNode = new QueueNode(song);
    if (!this.rear) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  dequeue(): Song | null {
    if (!this.front) return null;
    
    const dequeuedNode = this.front;
    this.front = this.front.next;
    
    if (!this.front) {
      this.rear = null;
    }
    
    this.size--;
    return dequeuedNode.data;
  }

  peek(): Song | null {
    return this.front ? this.front.data : null;
  }

  toArray(): Song[] {
    const result: Song[] = [];
    let current = this.front;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  fromArray(songs: Song[]): void {
    this.front = null;
    this.rear = null;
    this.size = 0;
    songs.forEach(s => this.enqueue(s));
  }
}
