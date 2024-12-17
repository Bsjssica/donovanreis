import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Occurrence {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  location: string;
  timestamp: string;
  photos?: string[];
}

interface OccurrenceState {
  occurrences: Occurrence[];
  addOccurrence: (occurrence: Occurrence) => void;
  updateOccurrence: (id: number, occurrence: Partial<Occurrence>) => void;
  deleteOccurrence: (id: number) => void;
}

export const useOccurrenceStore = create<OccurrenceState>()(
  persist(
    (set) => ({
      occurrences: [],
      addOccurrence: (occurrence) =>
        set((state) => ({
          occurrences: [...state.occurrences, occurrence],
        })),
      updateOccurrence: (id, updatedOccurrence) =>
        set((state) => ({
          occurrences: state.occurrences.map((occurrence) =>
            occurrence.id === id
              ? { ...occurrence, ...updatedOccurrence }
              : occurrence
          ),
        })),
      deleteOccurrence: (id) =>
        set((state) => ({
          occurrences: state.occurrences.filter((occurrence) => occurrence.id !== id),
        })),
    }),
    {
      name: 'occurrences-storage',
    }
  )
);