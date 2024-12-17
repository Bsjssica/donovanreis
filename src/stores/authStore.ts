import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { username: string; email: string };
  login: (username: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (username, password) => {
    // In a real app, you would make an API call here
    set({ isAuthenticated: true, user: { username, email: 'user@example.com' } });
  },
  register: (username, email, password) => {
    // In a real app, you would make an API call here
    set({ isAuthenticated: true, user: { username, email } });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));