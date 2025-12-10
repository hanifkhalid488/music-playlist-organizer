import { Song, SortOption } from '../types';

const compare = (a: Song, b: Song, criterion: SortOption): number => {
  if (criterion === 'duration') {
    return a.duration - b.duration;
  }
  const valA = (a[criterion] as string).toLowerCase();
  const valB = (b[criterion] as string).toLowerCase();
  if (valA < valB) return -1;
  if (valA > valB) return 1;
  return 0;
};

const merge = (left: Song[], right: Song[], criterion: SortOption): Song[] => {
  const sorted: Song[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j], criterion) <= 0) {
      sorted.push(left[i]);
      i++;
    } else {
      sorted.push(right[j]);
      j++;
    }
  }

  // Concatenate remaining elements
  while (i < left.length) {
    sorted.push(left[i]);
    i++;
  }
  while (j < right.length) {
    sorted.push(right[j]);
    j++;
  }

  return sorted;
};

export const mergeSort = (arr: Song[], criterion: SortOption): Song[] => {
  // Base case
  if (arr.length <= 1) return arr;

  // Split
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Recurse and Merge
  return merge(
    mergeSort(left, criterion),
    mergeSort(right, criterion),
    criterion
  );
};
