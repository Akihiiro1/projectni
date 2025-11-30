import { Movie } from './db';

const STORAGE_KEY = 'movie_watchlist';

export const localStorageDB = {
  getAll: (): Movie[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save: (movies: Movie[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  },

  getById: (id: string): Movie | null => {
    const movies = localStorageDB.getAll();
    return movies.find(m => m.id === id) || null;
  },

  create: (movie: Omit<Movie, 'id' | 'addedAt'>): Movie => {
    const movies = localStorageDB.getAll();
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      addedAt: new Date().toISOString()
    };
    movies.push(newMovie);
    localStorageDB.save(movies);
    return newMovie;
  },

  update: (id: string, updates: Partial<Movie>): Movie | null => {
    const movies = localStorageDB.getAll();
    const index = movies.findIndex(m => m.id === id);
    if (index === -1) return null;

    movies[index] = { ...movies[index], ...updates };
    localStorageDB.save(movies);
    return movies[index];
  },

  delete: (id: string): boolean => {
    const movies = localStorageDB.getAll();
    const filtered = movies.filter(m => m.id !== id);
    if (filtered.length === movies.length) return false;

    localStorageDB.save(filtered);
    return true;
  }
};
