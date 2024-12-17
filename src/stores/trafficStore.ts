import { create } from 'zustand';

export interface TrafficNews {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  source: string;
}

interface TrafficState {
  news: TrafficNews[];
  loading: boolean;
  error: string | null;
  setNews: (news: TrafficNews[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTrafficStore = create<TrafficState>((set) => ({
  news: [],
  loading: false,
  error: null,
  setNews: (news) => set({ news }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));